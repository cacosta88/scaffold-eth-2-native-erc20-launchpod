// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// Defining custom errors for better error handling
error NoValueSent();
error InsufficientFundsInContract(uint256 requested, uint256 available);
error NoActiveFlowForCreator(address creator);
error InsufficientInFlow(uint256 requested, uint256 available);
error EtherSendingFailed(address recipient);
error LengthsMismatch();
error CapCannotBeZero();
error InvalidCreatorAddress();
error CreatorAlreadyExists();
error ContractIsStopped();
error MaxCreatorsReached();
error AccessDenied();
error MismatchedTokenAndCapArrays();
error InvalidTokenAddress();
error DuplicateUserNotAllowed();
error NoFundsInContract();
error ERC20TransferFailed();
error ERC20SendingFailed(address token, address recipient);

contract YourContract is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Fixed cycle and max creators
    uint256 immutable CYCLE = 30 days;
    uint256 immutable MAXCREATORS = 25;

    // Emergency mode variable
    bool public stopped = false;

    // Primary admin for remaining balances
    address private primaryAdmin;

    // Modifier to check for admin permissions
    modifier onlyAdmin() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) revert AccessDenied();
        _;
    }

    // Constructor to setup admin role
    constructor(address _primaryAdmin) {
        _setupRole(DEFAULT_ADMIN_ROLE, _primaryAdmin);
        primaryAdmin = _primaryAdmin;
    }

    // Function to modify admin roles
    function modifyAdminRole(
        address adminAddress,
        bool shouldGrant
    ) public onlyAdmin {
        if (shouldGrant) {
            grantRole(DEFAULT_ADMIN_ROLE, adminAddress);
        } else {
            revokeRole(DEFAULT_ADMIN_ROLE, adminAddress);
        }
    }

    // Struct to store information about creator's flow
    struct CreatorFlowInfo {
        uint256 cap; // Maximum amount of funds that can be withdrawn in a cycle (in wei)
        uint256 last; // The timestamp of the last withdrawal
    }

    // struct for ERC20 creator flow information
    struct ERC20CreatorFlowInfo {
        mapping(address => uint256) caps;
        mapping(address => uint256) last;
    }

    // Mapping to store the flow info of each creator
    mapping(address => CreatorFlowInfo) public flowingCreators;
    // Mapping to store the index of each creator in the activeCreators array
    mapping(address => uint256) public creatorIndex;
    // Array to store the addresses of all active creators
    address[] public activeCreators;

    // Mapping to store ERC20 creator flow information
    mapping(address => ERC20CreatorFlowInfo) private erc20FlowingCreators; //later on add a parallel mapping which is public
    // Mapping to store the index of each ERC20 creator in the erc20ActiveCreators array
    mapping(address => uint256) public erc20CreatorIndex;
    // Array to store the addresses of all active ERC20 creators
    address[] public erc20ActiveCreators;
    // Mapping to store the tokens for each creator
    mapping(address => address[]) public creatorTokens;
    // Mapping to keep track of whether an ERC20 creator exists (turn on and off via add/remove)
    mapping(address => bool) public isCreatorAdded;

    // Declare events to log various activities
    event FundsReceived(address indexed from, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount, string reason);
    event CreatorAdded(address indexed to, uint256 amount, uint256 cycle);
    event CreatorUpdated(address indexed to, uint256 amount, uint256 cycle);
    event CreatorRemoved(address indexed to);
    event AgreementDrained(address indexed to, uint256 amount);

    // Events for ERC20 support
    event ERC20FundsReceived(
        address indexed token,
        address indexed from,
        uint256 amount
    );
    event ERC20Withdrawn(
        address indexed token,
        address indexed to,
        uint256 amount,
        string reason
    );
    event ERC20CreatorAdded(
        address indexed token,
        address indexed to,
        uint256 amount,
        uint256 cycle
    );
    event ERC20CreatorUpdated(
        address indexed token,
        address indexed to,
        uint256 amount,
        uint256 cycle
    );

    event ERC20CreatorRemoved(address indexed to);

    event ERC20Rescued(
        address indexed token,
        address indexed to,
        uint256 amount
    );

    // Check if a flow for a creator is active
    modifier isFlowActive(address _creator) {
        if (flowingCreators[_creator].cap == 0)
            revert NoActiveFlowForCreator(_creator);
        _;
    }

    // Check if an ERC20 flow for a creator is active
    modifier isERC20FlowActive(address _creator, address _token) {
        if (erc20FlowingCreators[_creator].caps[_token] == 0)
            revert NoActiveFlowForCreator(_creator);
        _;
    }

    // Check if the contract is stopped
    modifier stopInEmergency() {
        if (stopped) revert ContractIsStopped();
        _;
    }

    //Fund contract
    function fundContract() public payable {
        if (msg.value == 0) revert NoValueSent();
        emit FundsReceived(msg.sender, msg.value);
    }

    //Fund contract with ERC-20 tokens
    function fundContractERC20(address _token, uint256 _amount) public {
        if (_amount == 0) revert NoValueSent();

        uint256 currentBalance = IERC20(_token).balanceOf(address(this));
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        uint256 newBalance = IERC20(_token).balanceOf(address(this));
        if (newBalance == currentBalance) revert ERC20TransferFailed();

        emit ERC20FundsReceived(_token, msg.sender, _amount);
    }

    // Enable or disable emergency mode
    function emergencyMode(bool _enable) public onlyAdmin {
        stopped = _enable;
    }

    // Get all creators' data.
    function allCreatorsData(
        address[] calldata _creators
    ) public view returns (CreatorFlowInfo[] memory) {
        uint256 creatorLength = _creators.length;
        CreatorFlowInfo[] memory result = new CreatorFlowInfo[](creatorLength);
        for (uint256 i = 0; i < creatorLength; ++i) {
            address creatorAddress = _creators[i];
            result[i] = flowingCreators[creatorAddress];
        }
        return result;
    }

    function getCreatorTokens(
        address _creator
    ) public view returns (address[] memory) {
        return creatorTokens[_creator];
    }

    // Get all ERC20 creators' data.

    function allERC20CreatorsData(
        address[] calldata _creators,
        address[] calldata _tokens
    )
        public
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        uint256 creatorLength = _creators.length;
        uint256 tokenLength = _tokens.length;

        address[] memory tokenAddresses = new address[](
            creatorLength * tokenLength
        );
        uint256[] memory caps = new uint256[](creatorLength * tokenLength);
        uint256[] memory lastWithdrawals = new uint256[](
            creatorLength * tokenLength
        );

        uint256 k = 0;

        for (uint256 i = 0; i < creatorLength; ++i) {
            for (uint256 j = 0; j < tokenLength; ++j) {
                address tokenAddress = _tokens[j];
                tokenAddresses[k] = tokenAddress;
                if (!isCreatorAdded[_creators[i]]) {
                    caps[k] = 0;
                    lastWithdrawals[k] = 0;
                } else {
                    address creatorAddress = _creators[i];
                    caps[k] = erc20FlowingCreators[creatorAddress].caps[
                        tokenAddress
                    ];
                    lastWithdrawals[k] = erc20FlowingCreators[creatorAddress]
                        .last[tokenAddress];
                }
                ++k;
            }
        }
        return (tokenAddresses, caps, lastWithdrawals);
    }

    // Get the available amount for a creator.
    function availableCreatorAmount(
        address _creator
    ) public view isFlowActive(_creator) returns (uint256) {
        CreatorFlowInfo memory creatorFlow = flowingCreators[_creator];
        uint256 timePassed = block.timestamp - creatorFlow.last;
        uint256 cycleDuration = CYCLE;

        if (timePassed < cycleDuration) {
            uint256 availableAmount = (timePassed * creatorFlow.cap) /
                cycleDuration;
            return availableAmount;
        } else {
            return creatorFlow.cap;
        }
    }

    // Get the available amount for a creator
    function availableCreatorAmountERC20(
        address _creator,
        address _token
    ) public view returns (uint256) {
        if (
            erc20CreatorIndex[_creator] == 0 &&
            _creator != erc20ActiveCreators[0]
        ) {
            return 0;
        }

        ERC20CreatorFlowInfo storage creatorERC20Flow = erc20FlowingCreators[
            _creator
        ];

        uint256 cap = creatorERC20Flow.caps[_token];

        uint256 timePassed = block.timestamp - creatorERC20Flow.last[_token];

        if (timePassed < CYCLE) {
            uint256 availableAmount = (timePassed * cap) / CYCLE;
            return availableAmount;
        } else {
            return cap;
        }
    }

    // Add a new creator's flow. No more than 25 creators are allowed.
    function addCreatorFlow(
        address payable _creator,
        uint256 _cap
    ) public onlyAdmin {
        // Check for maximum creators.
        if (activeCreators.length >= MAXCREATORS) revert MaxCreatorsReached();

        validateCreatorInput(_creator, _cap);
        flowingCreators[_creator] = CreatorFlowInfo(_cap, block.timestamp);
        activeCreators.push(_creator);
        creatorIndex[_creator] = activeCreators.length - 1;
        emit CreatorAdded(_creator, _cap, CYCLE);
    }

    // Add a batch of creators.
    function addBatch(
        address[] memory _creators,
        uint256[] memory _caps
    ) public onlyAdmin {
        uint256 cLength = _creators.length;
        if (cLength != _caps.length) revert LengthsMismatch();
        for (uint256 i = 0; i < cLength; ) {
            addCreatorFlow(payable(_creators[i]), _caps[i]);
            unchecked {
                ++i;
            }
        }
    }

    // Add a new creator's ERC20 based flow.
    function addCreatorERC20Flow(
        address payable _creator,
        address[] memory _tokenAddresses,
        uint256[] memory _caps
    ) public onlyAdmin {
        if (erc20ActiveCreators.length >= MAXCREATORS)
            revert MaxCreatorsReached();
        if (_tokenAddresses.length != _caps.length) revert LengthsMismatch();
        if (isCreatorAdded[_creator] != false) revert DuplicateUserNotAllowed();

        for (uint256 i = 0; i < _tokenAddresses.length; ++i) {
            if (_tokenAddresses[i] == address(0)) revert InvalidTokenAddress();
            if (_caps[i] == 0) revert CapCannotBeZero();
            if (erc20FlowingCreators[_creator].caps[_tokenAddresses[i]] != 0)
                revert DuplicateUserNotAllowed();

            erc20FlowingCreators[_creator].caps[_tokenAddresses[i]] = _caps[i];
            emit ERC20CreatorAdded(
                _tokenAddresses[i],
                _creator,
                _caps[i],
                CYCLE
            );

            creatorTokens[_creator].push(_tokenAddresses[i]);
        }

        for (uint256 i = 0; i < _tokenAddresses.length; ++i) {
            erc20FlowingCreators[_creator].last[_tokenAddresses[i]] = block
                .timestamp;
        }
        erc20ActiveCreators.push(_creator);
        erc20CreatorIndex[_creator] = erc20ActiveCreators.length - 1;
        isCreatorAdded[_creator] = true; 
    }

    // Add a batch of creators
    function addBatchERC20Creators(
        address[] memory _creators,
        address[][] memory _tokenAddresses,
        uint256[][] memory _caps
    ) public onlyAdmin {
        uint256 cLength = _creators.length;
        if (cLength != _caps.length || cLength != _tokenAddresses.length)
            revert LengthsMismatch();

        for (uint256 i = 0; i < cLength; ++i) {
            if (_tokenAddresses[i].length != _caps[i].length)
                revert MismatchedTokenAndCapArrays();
            addCreatorERC20Flow(
                payable(_creators[i]),
                _tokenAddresses[i],
                _caps[i]
            );
        }
    }

    // Validate the input for a creator
    function validateCreatorInput(
        address payable _creator,
        uint256 _cap
    ) internal view {
        if (_creator == address(0)) revert InvalidCreatorAddress();
        if (_cap == 0) revert CapCannotBeZero();
        if (flowingCreators[_creator].cap > 0) revert CreatorAlreadyExists();
    }

    // Update a creator's flow cap and cycle.
    function updateCreatorFlowCapCycle(
        address payable _creator,
        uint256 _newCap
    ) public onlyAdmin isFlowActive(_creator) {
        if (_newCap == 0) revert CapCannotBeZero();

        CreatorFlowInfo storage creatorFlow = flowingCreators[_creator];

        creatorFlow.cap = _newCap;

        uint256 timestamp = block.timestamp;
        uint256 timePassed = timestamp - creatorFlow.last;

        if (CYCLE < timePassed) {
            creatorFlow.last = timestamp - (CYCLE);
        }

        emit CreatorUpdated(_creator, _newCap, CYCLE);
    }

    // Update a creator's ERC20 flow cap and cycle.
    function updateCreatorERC20FlowCapCycle(
        address payable _creator,
        address _token,
        uint256 _newCap
    ) external onlyAdmin isERC20FlowActive(_creator, _token) {
        if (_newCap == 0) revert CapCannotBeZero();

        ERC20CreatorFlowInfo storage creatorERC20Flow = erc20FlowingCreators[
            _creator
        ];

        creatorERC20Flow.caps[_token] = _newCap;

        uint256 timestamp = block.timestamp;
        uint256 timePassed = timestamp - creatorERC20Flow.last[_token];

        if (CYCLE < timePassed) {
            creatorERC20Flow.last[_token] = timestamp - (CYCLE);
        }

        emit ERC20CreatorUpdated(_token, _creator, _newCap, CYCLE);

        bool tokenExists = false;
        for (uint256 j = 0; j < creatorTokens[_creator].length; ++j) {
            if (creatorTokens[_creator][j] == _token) {
                tokenExists = true;
                break;
            }
        }
        if (!tokenExists) {
            creatorTokens[_creator].push(_token);
        }
    }

    // Remove a creator's flow
    function removeCreatorFlow(
        address _creator
    ) public onlyAdmin isFlowActive(_creator) {
        uint256 creatorIndexToRemove = creatorIndex[_creator];
        address lastCreator = activeCreators[activeCreators.length - 1];

        if (_creator != lastCreator) {
            activeCreators[creatorIndexToRemove] = lastCreator;
            creatorIndex[lastCreator] = creatorIndexToRemove;
        }

        activeCreators.pop();

        delete flowingCreators[_creator];
        delete creatorIndex[_creator];

        emit CreatorRemoved(_creator);
    }

    // Remove a creator's ERC20 flow.
    function removeCreatorERC20Flow(address _creator) external onlyAdmin {
        uint256 creatorIndexToRemove = erc20CreatorIndex[_creator];
        address lastCreator = erc20ActiveCreators[
            erc20ActiveCreators.length - 1
        ];

        if (_creator != lastCreator) {
            erc20ActiveCreators[creatorIndexToRemove] = lastCreator;
            erc20CreatorIndex[lastCreator] = creatorIndexToRemove;
        }

        erc20ActiveCreators.pop();

        delete erc20FlowingCreators[_creator];
        delete erc20CreatorIndex[_creator];
        delete creatorTokens[_creator];

        isCreatorAdded[_creator] = false;

        emit ERC20CreatorRemoved(_creator);
    }

    // Creator withdraws funds.
    function flowWithdraw(
        uint256 _amount,
        string memory _reason
    ) public isFlowActive(msg.sender) nonReentrant stopInEmergency {
        CreatorFlowInfo storage creatorFlow = flowingCreators[msg.sender];

        uint256 totalAmountCanWithdraw = availableCreatorAmount(msg.sender);
        if (totalAmountCanWithdraw < _amount)
            revert InsufficientInFlow(_amount, totalAmountCanWithdraw);

        uint256 creatorflowLast = creatorFlow.last;
        uint256 timestamp = block.timestamp;
        uint256 cappedLast = timestamp - CYCLE;
        if (creatorflowLast < cappedLast) {
            creatorflowLast = cappedLast;
        }

        uint256 contractFunds = address(this).balance;
        if (contractFunds < _amount)
            revert InsufficientFundsInContract(_amount, contractFunds);

        (bool sent, ) = msg.sender.call{value: _amount, gas: 21000}(""); // Considered reasonable amount of gas limit for simple eth transfers, assuming recipient is an EOA
        if (!sent) revert EtherSendingFailed(msg.sender);

        creatorFlow.last =
            creatorflowLast +
            (((timestamp - creatorflowLast) * _amount) /
                totalAmountCanWithdraw);

        emit Withdrawn(msg.sender, _amount, _reason);
    }

    // Creator withdraws ERC-20 tokens.
    function erc20Withdraw(
        address _token,
        uint256 _amount,
        string memory _reason
    )
        external
        nonReentrant
        stopInEmergency
        isERC20FlowActive(msg.sender, _token)
    {
        uint256 totalAmountCanWithdraw = availableCreatorAmountERC20(
            msg.sender,
            _token
        );
        if (totalAmountCanWithdraw < _amount)
            revert InsufficientInFlow(_amount, totalAmountCanWithdraw);

        uint256 creatorERC20FlowLast = erc20FlowingCreators[msg.sender].last[
            _token
        ];
        uint256 timestamp = block.timestamp;
        uint256 cappedLast = timestamp - CYCLE;
        if (creatorERC20FlowLast < cappedLast) {
            creatorERC20FlowLast = cappedLast;
        }

        uint256 tokenBalance = IERC20(_token).balanceOf(address(this));
        if (tokenBalance < _amount)
            revert InsufficientFundsInContract(_amount, tokenBalance);

        IERC20(_token).safeTransfer(msg.sender, _amount);
        //check balance after transfer
        uint256 newTokenBalance = IERC20(_token).balanceOf(address(this));
        if (newTokenBalance != tokenBalance - _amount)
            revert ERC20SendingFailed(_token, msg.sender);

        erc20FlowingCreators[msg.sender].last[_token] =
            creatorERC20FlowLast +
            (((timestamp - creatorERC20FlowLast) * _amount) /
                totalAmountCanWithdraw);

        emit ERC20Withdrawn(_token, msg.sender, _amount, _reason);
    }

    // Drain the agreement to the current primary admin
    function drainAgreement() public onlyAdmin nonReentrant {
        uint256 remainingBalance = address(this).balance;
        if (remainingBalance == 0) revert NoFundsInContract();

        (bool sent, ) = primaryAdmin.call{value: remainingBalance}(""); // No gas limit imposed here in case deployer is a smart contract that executes additional logic upon receiving eth
        if (!sent) revert EtherSendingFailed(primaryAdmin);

        emit AgreementDrained(primaryAdmin, remainingBalance);
    }

    // Admin withdraws ERC-20 tokens.
    function erc20WithdrawByAdmin(
        address _token,
        uint256 _amount
    ) external onlyAdmin nonReentrant {
        uint256 tokenBalance = IERC20(_token).balanceOf(address(this));
        if (tokenBalance < _amount)
            revert InsufficientFundsInContract(_amount, tokenBalance);

        IERC20(_token).safeTransfer(primaryAdmin, _amount);

        uint256 newTokenBalance = IERC20(_token).balanceOf(address(this));
        if (newTokenBalance != tokenBalance - _amount)
            revert ERC20SendingFailed(_token, primaryAdmin);

        emit ERC20Rescued(_token, primaryAdmin, _amount);
    }

    // Fallback function to receive ether
    receive() external payable {}
}
