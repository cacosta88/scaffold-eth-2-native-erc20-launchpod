//Before running this test file, make sure contract constructor //arguments are set to deployer in 00_deploy_your_contract in //the packages\hardhat\deploy directory
//Also, make sure to verify that the CYCLE variable is set to 30 //days in YourContract.sol in packages\hardhat\contracts //directory


import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { YourContract,ERC20Mock1,ERC20Mock2} from "../../typechain-types";
import { Address } from "hardhat-deploy/types";

const CYCLE = 30 * 24 * 60 * 60;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const CAP = ethers.utils.parseEther("0.5");
const ERC20CAP = ethers.BigNumber.from(10);
const halfERC20CAP = ethers.BigNumber.from(5);
const CAP_UPDATE = ethers.utils.parseEther("0.6");

describe("Test file for YourContract.sol", () => {
   let admin: SignerWithAddress;
   let user_1: SignerWithAddress;
   let user_2: SignerWithAddress;
   let user_3: SignerWithAddress;
   let user_4: SignerWithAddress;
   let user_5: SignerWithAddress;
   let user_6: SignerWithAddress;
   let user_7: SignerWithAddress;
   let user_8: SignerWithAddress;
   let user_9: SignerWithAddress;
   let user_10: SignerWithAddress;
   let user_11: SignerWithAddress;
   let user_12: SignerWithAddress;
   let user_13: SignerWithAddress;
   let user_14: SignerWithAddress;
   let user_15: SignerWithAddress;
   let user_16: SignerWithAddress;
   let user_17: SignerWithAddress;
   let user_18: SignerWithAddress;
   let user_19: SignerWithAddress;
   let user_20: SignerWithAddress;
   let user_21: SignerWithAddress;
   let user_22: SignerWithAddress;
   let user_23: SignerWithAddress;
   let user_24: SignerWithAddress;
   let user_25: SignerWithAddress;
   let user_26: SignerWithAddress;

   let contract: YourContract;
   let mock_1: ERC20Mock1;
   let mock_2: ERC20Mock2;

  beforeEach(async () => {
    const signers: SignerWithAddress[] = await ethers.getSigners();

    admin = signers[0];
    user_1 = signers[1];
    user_2 = signers[2];
    user_3 = signers[3];
    user_4 = signers[4];
    user_5 = signers[5];
    user_6 = signers[6];
    user_7 = signers[7];
    user_8 = signers[8];
    user_9 = signers[9];
    user_10 = signers[10];
    user_11 = signers[11];
    user_12 = signers[12];
    user_13 = signers[13];
    user_14 = signers[14];
    user_15 = signers[15];
    user_16 = signers[16];
    user_17 = signers[17];
    user_18 = signers[18];
    user_19 = signers[19];
    user_20 = signers[20];
    user_21 = signers[21];
    user_22 = signers[22];
    user_23 = signers[23];
    user_24 = signers[24];
    user_25 = signers[25];
    user_26 = signers[26];    

await deployments.fixture(["YourContract", "ERC20Mock1", "ERC20Mock2"]);


contract = await ethers.getContract("YourContract", admin);
mock_1 = await ethers.getContract("ERC20Mock1");
mock_2 = await ethers.getContract("ERC20Mock2");


  });

  const hasAdminRole = async (account: Address) => {
    const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
    return await contract.hasRole(DEFAULT_ADMIN_ROLE, account);
  };

  const addCreatorFlows = async () => {
    await contract.addCreatorFlow(user_1.address, CAP);
    await contract.addCreatorFlow(user_2.address, CAP);
    await contract.addCreatorFlow(user_3.address, CAP);
    await contract.addCreatorFlow(user_4.address, CAP);
    await contract.addCreatorFlow(user_5.address, CAP);
    await contract.addCreatorFlow(user_6.address, CAP);
    await contract.addCreatorFlow(user_7.address, CAP);
    await contract.addCreatorFlow(user_8.address, CAP);
    await contract.addCreatorFlow(user_9.address, CAP);
    await contract.addCreatorFlow(user_10.address, CAP);
    await contract.addCreatorFlow(user_11.address, CAP);
    await contract.addCreatorFlow(user_12.address, CAP);
    await contract.addCreatorFlow(user_13.address, CAP);
    await contract.addCreatorFlow(user_14.address, CAP);
    await contract.addCreatorFlow(user_15.address, CAP);
    await contract.addCreatorFlow(user_16.address, CAP);
    await contract.addCreatorFlow(user_17.address, CAP);
    await contract.addCreatorFlow(user_18.address, CAP);
    await contract.addCreatorFlow(user_19.address, CAP);
    await contract.addCreatorFlow(user_20.address, CAP);
    await contract.addCreatorFlow(user_21.address, CAP);
    await contract.addCreatorFlow(user_22.address, CAP);
    await contract.addCreatorFlow(user_23.address, CAP);
    await contract.addCreatorFlow(user_24.address, CAP);
    await contract.addCreatorFlow(user_25.address, CAP);
  };

  const addCreatorFlowsERC20 = async () => {
    await contract.addCreatorERC20Flow(user_1.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_2.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_3.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_4.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_5.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_6.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_7.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_8.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_9.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_10.address,[mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_11.address,[mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_12.address,[mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_13.address,[mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_14.address,[mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_15.address,[mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_16.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_17.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_18.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_19.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_20.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_21.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_22.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_23.address, [mock_1.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_24.address, [mock_2.address],[ERC20CAP]);
    await contract.addCreatorERC20Flow(user_25.address, [mock_1.address],[ERC20CAP]);
  };

  describe("Deployment", () => {
    it("Should set the correct admin upon deployment", async () => {
      expect(await hasAdminRole(admin.address)).to.be.true;
    });
  });

  describe("Admin role modification", () => {
    it("Should grant admin role", async () => {
      await contract.modifyAdminRole(user_2.address, true);
      expect(await hasAdminRole(user_2.address)).to.be.true;
      expect(await hasAdminRole(admin.address)).to.be.true;
    });
    it("Should revoke admin role", async () => {
      await contract.modifyAdminRole(user_2.address, false);
      expect(await hasAdminRole(user_2.address)).to.be.false;
    });
  });

  describe("Emergency mode", () => {
    it("Should enable emergency mode", async () => {
      await contract.emergencyMode(true);
      expect(await contract.stopped()).to.be.true;
    });

    it("Should disable emergency mode", async () => {
      await contract.emergencyMode(false);
      expect(await contract.stopped()).to.be.false;
    });
    it("Should revert if caller is not admin", async () => {
      await expect(contract.connect(user_2).emergencyMode(false)).to.be.revertedWithCustomError(
        contract,
        "AccessDenied",
      );
    });
  });

  describe("Fund contract", () => {
    it("Should receive funds and emits an event", async () => {
      const provider = ethers.provider;

      const oldBalance = await provider.getBalance(contract.address);

      const amount = CAP.mul(26);
      await expect(contract.fundContract({ value: amount }))
        .to.emit(contract, "FundsReceived")
        .withArgs(admin.address, amount);

      const newBalance = await provider.getBalance(contract.address);

      expect(newBalance).to.equal(oldBalance.add(amount));
    });
    it("Should correctly revert if amount is ZERO", async () => {
      await expect(contract.fundContract({ value: 0 })).to.be.revertedWithCustomError(contract, "NoValueSent");
    });
  });



  describe("Add creator flow", () => {
    it("Should add creator flow and emit corresponding event", async () => {
      await expect(contract.addCreatorFlow(user_2.address, CAP))
        .to.emit(contract, "CreatorAdded")
        .withArgs(user_2.address, CAP, 30 * (60 * 60 * 24));

      const creator = await contract.flowingCreators(user_2.address);
      expect(creator[0]).to.equal(CAP);
      expect(await contract.activeCreators(0)).to.equal(user_2.address);
    });

    it("Should if max creator has been reached", async () => {
      await addCreatorFlows();

      await expect(contract.addCreatorFlow(user_26.address, CAP)).to.be.revertedWithCustomError(
        contract,
        "MaxCreatorsReached",
      );
    });
    it("Should revert if creator is zero address", async () => {
      await expect(contract.addCreatorFlow(ZERO_ADDRESS, CAP)).to.be.revertedWithCustomError(
        contract,
        "InvalidCreatorAddress",
      );
    });
    it("Should revert if cap is zero", async () => {
      await expect(contract.addCreatorFlow(user_2.address, 0)).to.be.revertedWithCustomError(
        contract,
        "CapCannotBeZero",
      );
    });
    it("Should if creator already exists", async () => {
      await contract.addCreatorFlow(user_2.address, CAP);
      await expect(contract.addCreatorFlow(user_2.address, CAP)).to.be.revertedWithCustomError(
        contract,
        "CreatorAlreadyExists",
      );
    });
  });

  describe("Add batch of creators", function () {
  it("Should add a batch of creators", async function () {
    await contract.connect(admin).addBatch([user_1.address, user_2.address], [CAP, CAP]);

    let creatorInfo1 = await contract.flowingCreators(user_1.address);
    expect(creatorInfo1.cap).to.equal(CAP);

    let creatorInfo2 = await contract.flowingCreators(user_2.address);
    expect(creatorInfo2.cap).to.equal(CAP);
  });
});

describe("all Creator Data", () => {
    it("Should correctly retrieve creator data", async () => {
      await addCreatorFlows();
      const creator1 = await contract.activeCreators(0);
      const creator2 = await contract.activeCreators(1);
      const creators = await contract.allCreatorsData([creator1, creator2]);

      expect(creators[0].cap).to.equal(CAP);
      expect(creators[1].cap).to.equal(CAP);
    });
  });


describe("Remove Creator", () => {
    beforeEach(addCreatorFlows);

    it("Should remove a creator's flow successfully", async () => {
      await contract.removeCreatorFlow(user_2.address);
      const creator = await contract.flowingCreators(user_2.address);
      expect(creator[0]).to.equal(0);
    });

    it("Should emit an event when a creator's flow is removed", async () => {
      await expect(contract.removeCreatorFlow(user_2.address))
        .to.emit(contract, "CreatorRemoved")
        .withArgs(user_2.address);
    });
  });

describe("Update creator Cap", () => {
    beforeEach(addCreatorFlows);

    it("Should update a creator's flow cap", async () => {
      await contract.updateCreatorFlowCapCycle(user_2.address, CAP_UPDATE);
      const creator = await contract.flowingCreators(user_2.address);
      expect(creator[0]).to.equal(CAP_UPDATE);
    });

    it("Should emit an event when a creator's flow cap is updated", async () => {
      await expect(contract.updateCreatorFlowCapCycle(user_2.address, CAP_UPDATE))
        .to.emit(contract, "CreatorUpdated")
        .withArgs(user_2.address, CAP_UPDATE, 2592000);
    });


    it("Should revert when a new cap is zero", async () => {
      await expect(contract.updateCreatorFlowCapCycle(user_2.address, 0)).to.be.revertedWithCustomError(contract,"CapCannotBeZero");
    });
});


 describe("Flow withdraw", function () {
  it("Should allow a creator to withdraw", async function () {
    await contract.connect(admin).addCreatorFlow(user_2.address, 100);
    await contract.connect(admin).fundContract({ value: 1000 });

    // Fast forward 15 days
    await ethers.provider.send("evm_increaseTime", [15 * 24 * 3600]);
    await ethers.provider.send("evm_mine");

    const initialBalance = await ethers.provider.getBalance(user_2.address);
    const tx = await contract.connect(user_2).flowWithdraw(40, "Withdraw");
    const txReceipt = await tx.wait();
    const gasUsed = txReceipt.gasUsed.mul(tx.gasPrice);

    const creatorInfo = await contract.flowingCreators(user_2.address);

    const finalBalance = await ethers.provider.getBalance(user_2.address);
    expect(finalBalance.add(gasUsed).sub(initialBalance)).to.equal(40);
  });

  it("Should  emit event when a creator withdraws", async () => {
    await contract.connect(admin).addCreatorFlow(user_2.address, CAP);
    await contract.connect(admin).fundContract({ value: CAP });

    // Fast forward 15 days
    await ethers.provider.send("evm_increaseTime", [15 * 24 * 3600]);
    await ethers.provider.send("evm_mine");

    await expect(contract.connect(user_2).flowWithdraw(CAP.div(2), "Withdraw")).to.emit(contract, "Withdrawn").withArgs(user_2.address, CAP.div(2), "Withdraw");
  });
});

describe("Drain agreement", function () {
  it("Should drain remaining funds to the primary admin", async function () {
    await contract.connect(admin).fundContract({ value: CAP });

    const initialAdminBalance = await ethers.provider.getBalance(admin.address);
    const tx = await contract.connect(admin).drainAgreement();
    const txReceipt = await tx.wait();
    const gasUsed = txReceipt.gasUsed.mul(tx.gasPrice);

    expect(await ethers.provider.getBalance(contract.address)).to.equal(0);

    const finalAdminBalance = await ethers.provider.getBalance(admin.address);
    expect(finalAdminBalance.add(gasUsed).sub(initialAdminBalance)).to.equal(CAP);
  });

    it("Should correctly emit event when agreement is drained", async () => {
        await contract.connect(admin).fundContract({ value: CAP });

        await expect(contract.connect(admin).drainAgreement()).to.emit(contract, "AgreementDrained").withArgs(admin.address, CAP);
    });
});



  describe("Multi-cycle rollover test", function () {
    it("Should rollover remaining amount correctly over multiple cycles", async function () {
      // Variables for the test scenario
      const creator = user_2;
      const cap = ethers.utils.parseEther("1"); // 1 ETH cap
      const midCycleTimestamp = CYCLE / 2;
      const withdrawAmount = cap.div(2); // withdraw 0.5 ETH
      const lastSecondInCycle = CYCLE - 1;

      await contract.addCreatorFlow(creator.address, cap);
      
      // Fund the contract with 10 ETH
      await contract.connect(admin).fundContract({ value: ethers.utils.parseEther("10") });


      // Advance time to the middle of the cycle
      await ethers.provider.send("evm_increaseTime", [midCycleTimestamp]);
      await ethers.provider.send("evm_mine");

      // Withdraw 0.5 ETH (half of the cap) at the middle of the cycle
      await contract.connect(creator).flowWithdraw(withdrawAmount, "Test withdraw");

      // Move to the last second of the first cycle
      await ethers.provider.send("evm_increaseTime", [midCycleTimestamp - 1]);
      await ethers.provider.send("evm_mine");

      // Check available amount at the last second of the first cycle
      const availableAmountEndFirstCycle = await contract.callStatic.availableCreatorAmount(creator.address);
      expect(availableAmountEndFirstCycle).to.be.closeTo(withdrawAmount, 385802469135); // Close to 0.5 ETH within 

      // Move to the first second of the next cycle
      await ethers.provider.send("evm_mine");

      // Check available amount at the beginning of the next cycle
      const availableAmountStartSecondCycle = await contract.callStatic.availableCreatorAmount(creator.address);
      expect(availableAmountStartSecondCycle).to.be.closeTo(withdrawAmount,771604938271); // Close to 0.5 ETH

      // Move to the last second of the next cycle
      await ethers.provider.send("evm_increaseTime", [lastSecondInCycle]);
      await ethers.provider.send("evm_mine");

      // Check available amount at the last second of the next cycle
      const availableAmountEndNextCycle = await contract.callStatic.availableCreatorAmount(creator.address);
      expect(availableAmountEndNextCycle).to.be.closeTo(cap,771604938271); // Close to 1 ETH
    });
  });



    describe("Fund contract with ERC20 tokens", function() {
      it("Should deposit ERC20Mock1 tokens into the contract", async function() {
        // Mint tokens to user_1
        const amount = ethers.BigNumber.from(100);
        await mock_1.faucet(user_1.address);
    
        // Approve contract to spend tokens
        await mock_1.connect(user_1).approve(contract.address, amount);
    
        // Deposit tokens to the contract
        await expect(contract.connect(user_1).fundContractERC20(mock_1.address, amount)).to.emit(contract, "ERC20FundsReceived").withArgs(mock_1.address,user_1.address,amount);
    
        // Check contract's token balance
        const contractBalance = await mock_1.balanceOf(contract.address);
        expect(contractBalance).to.equal(amount);
      });
    
      it("Should deposit ERC20Mock2 tokens into the contract", async function() {
        // Mint tokens to user_2
        const amount = ethers.BigNumber.from(100);
        await mock_2.faucet(user_2.address);
    
        // Approve contract to spend tokens
        await mock_2.connect(user_2).approve(contract.address, amount);
    
        // Deposit tokens to the contract
        await expect(contract.connect(user_2).fundContractERC20(mock_2.address, amount)).to.emit(contract, "ERC20FundsReceived").withArgs(mock_2.address,user_2.address,amount);
    
        // Check contract's token balance
        const contractBalance = await mock_2.balanceOf(contract.address);
        expect(contractBalance).to.equal(amount);
      });

      it("Should revert with custom error NoValueSent if the amount of ERC20Mock1 tokens is zero", async function() {
        // Mint tokens to user_1
        await mock_1.faucet(user_1.address);
    
        // Approve contract to spend tokens
        await mock_1.connect(user_1).approve(contract.address, 0);
    
        // Attempt to deposit zero tokens to the contract
        await expect(contract.connect(user_1).fundContractERC20(mock_1.address, 0)).to.be.revertedWithCustomError(contract, "NoValueSent");
      });
    });

    describe("Add ERC20 creator stream", function() {

  
      it("Should add a creator with two tokens each with 10 of cap", async function() {
          const tokenAddresses = [mock_1.address, mock_2.address];
          const caps = [ethers.BigNumber.from(10), ethers.BigNumber.from(10)];
  
          await contract.addCreatorERC20Flow(user_2.address, tokenAddresses, caps);
  
          // \Check creator data using allERC20CreatorsData function
          const creators = [user_2.address];
          const [returnedTokenAddresses, returnedCaps, _] = await contract.allERC20CreatorsData(creators, tokenAddresses);
  
          expect(returnedTokenAddresses[0]).to.equal(tokenAddresses[0]);
          expect(returnedCaps[0]).to.equal(caps[0]);
          expect(returnedTokenAddresses[1]).to.equal(tokenAddresses[1]);
          expect(returnedCaps[1]).to.equal(caps[1]);
  
          const creatorIndex = await contract.erc20CreatorIndex(user_2.address);
          expect(creatorIndex).to.not.be.undefined; // Make sure the creator index is defined
          const creatorInArray = await contract.erc20ActiveCreators(creatorIndex);
          expect(creatorInArray).to.equal(user_2.address); // Verify that the creator is registered in the erc20ActiveCreators array
      });});

      describe("Reverts on addCreatorERC20Flow", function() {
      
    
       
      it("Should revert if the number of creators exceeds MAXCREATORS", async function() {
      await addCreatorFlowsERC20();
       
        
     
        const tokenAddresses = [mock_1.address];
        const caps = [ethers.BigNumber.from(10)];

        await expect(contract.addCreatorERC20Flow(user_26.address, tokenAddresses, caps)).to.be.revertedWithCustomError(contract, "MaxCreatorsReached");
    });

    it("Should revert if _tokenAddresses and _caps have different lengths", async function() {
        const tokenAddresses = [mock_1.address];
        const caps = [ethers.BigNumber.from(10), ethers.BigNumber.from(10)]; // Providing two caps

        await expect(contract.addCreatorERC20Flow(user_2.address, tokenAddresses, caps)).to.be.revertedWithCustomError(contract, "LengthsMismatch");
    });

    it("Should revert if token address is zero address", async function() {
        const tokenAddresses = [ZERO_ADDRESS];
        const caps = [ethers.BigNumber.from(10)];

        await expect(contract.addCreatorERC20Flow(user_2.address, tokenAddresses, caps)).to.be.revertedWithCustomError(contract, "InvalidTokenAddress");
    });

    it("Should revert if cap is zero", async function() {
        const tokenAddresses = [mock_1.address];
        const caps = [0];

        await expect(contract.addCreatorERC20Flow(user_2.address, tokenAddresses, caps)).to.be.revertedWithCustomError(contract, "CapCannotBeZero");
    });

    it("Should revert if the creator already exists", async function() {
        const tokenAddresses = [mock_1.address];
        const caps = [ethers.BigNumber.from(10)];

        // Add creator for the first time
        await contract.addCreatorERC20Flow(user_2.address, tokenAddresses, caps);

        // Try to add the same creator again
        await expect(contract.addCreatorERC20Flow(user_2.address, tokenAddresses, caps)).to.be.revertedWithCustomError(contract, "DuplicateUserNotAllowed");
    });
});

describe("Add batch of creators with ERC20 streams ", () => {
  it("Should add multiple ERC20 creators and store them correctly", async () => {
    // Adding multiple creators in a batch
    await contract.addBatchERC20Creators(
      [
        user_1.address,
        user_2.address,
        user_3.address,
        user_4.address,
        user_5.address,
      ],
      [
        [mock_1.address, mock_2.address],
        [mock_1.address, mock_2.address],
        [mock_1.address, mock_2.address],
        [mock_1.address, mock_2.address],
        [mock_1.address, mock_2.address],
      ],
      [
        [ERC20CAP, ERC20CAP],
        [ERC20CAP, ERC20CAP],
        [ERC20CAP, ERC20CAP],
        [ERC20CAP, ERC20CAP],
        [ERC20CAP, ERC20CAP],
      ]
    );

    // Check creator data using allERC20CreatorsData function
    const creators = [
      user_1.address,
      user_2.address,
      user_3.address,
      user_4.address,
      user_5.address,
    ];
    const [returnedTokenAddresses, returnedCaps, _x] = await contract.allERC20CreatorsData(
      creators,
      [mock_1.address, mock_2.address]
    );
      
    expect(returnedTokenAddresses[0]).to.equal(mock_1.address);
    expect(returnedCaps[0]).to.equal(ERC20CAP);
    expect(returnedTokenAddresses[1]).to.equal(mock_2.address);
    expect(returnedCaps[1]).to.equal(ERC20CAP);
    expect(returnedTokenAddresses[2]).to.equal(mock_1.address);
    expect(returnedCaps[2]).to.equal(ERC20CAP);
    expect(returnedTokenAddresses[3]).to.equal(mock_2.address);
    expect(returnedCaps[3]).to.equal(ERC20CAP);
    expect(returnedTokenAddresses[4]).to.equal(mock_1.address);
    expect(returnedCaps[4]).to.equal(ERC20CAP);

  });
});

describe("Update cap of ERC20 creator", () => {
  it("Should update the cap correctly", async () => {
    const oldCap = ERC20CAP;
    const newCap = ethers.BigNumber.from(20); // The new cap to update

    // Adding a creator using addCreatorERC20Flow function before updating cap
    await contract.addCreatorERC20Flow(user_1.address, [mock_1.address],[oldCap]);

    // Updating the cap using updateCreatorERC20FlowCapCycle function
    await contract.connect(admin).updateCreatorERC20FlowCapCycle(user_1.address, mock_1.address, newCap);

    // Get the updated cap using allERC20CreatorsData function
    const [returnedTokenAddresses, returnedCaps, _y] = await contract.allERC20CreatorsData(
      [user_1.address],
      [mock_1.address]
    );
    const updatedCap = returnedCaps[0];

    // Check if the cap has been updated correctly
    expect(updatedCap).to.equal(newCap);
  });

  it("Should revert when trying to update cap with zero", async () => {
    const newCap = 0;

    // Adding a creator using addCreatorERC20Flow function before updating cap
    await contract.addCreatorERC20Flow(user_1.address, [mock_1.address],[ERC20CAP]);

    // Attempt to update the cap with zero
    await expect(contract.connect(admin).updateCreatorERC20FlowCapCycle(user_1.address, mock_1.address, newCap)).to.be.revertedWithCustomError(contract,'CapCannotBeZero');
  });
});



describe("Remove ERC20 creator", () => {
  
  it("Add one user, simulate the passage of time,user withdraws and is then removed", async () => {
    // Add a single user with two tokens, mock_1 and mock_2
    await contract.addCreatorERC20Flow(user_1.address, [mock_1.address, mock_2.address], [ERC20CAP, ERC20CAP]);

    // Check that the user has been added correctly using allERC20CreatorsData function do not use
    const [returnedTokenAddresses, returnedCaps, _z] = await contract.allERC20CreatorsData(
      [user_1.address],
      [mock_1.address, mock_2.address]
    );
    const user_1_token_caps = [returnedCaps[0], returnedCaps[1]];
    expect(user_1_token_caps).to.deep.equal([ERC20CAP, ERC20CAP]);


    // get token one and two from the faucet as admin and deposit into contract
    await mock_1.connect(admin).faucet(admin.address);
    await mock_2.connect(admin).faucet(admin.address);
    await mock_1.connect(admin).approve(contract.address, ERC20CAP);
    await mock_2.connect(admin).approve(contract.address, ERC20CAP);

    // Deposit tokens into the contract
    await contract.connect(admin).fundContractERC20(mock_1.address, ERC20CAP);
    await contract.connect(admin).fundContractERC20(mock_2.address, ERC20CAP);

    // Check that the user has been added correctly using allERC20CreatorsData function
    const [returnedTokenAddresses1, returnedCaps1, _b] = await contract.allERC20CreatorsData(
      [user_1.address],
      [mock_1.address, mock_2.address]
    );
    const user_1_token_caps1 = [returnedCaps1[0].toString(), returnedCaps1[1].toString()];
    expect(user_1_token_caps1).to.deep.equal([ERC20CAP, ERC20CAP]);


    // simulate the passage of time (30 days)
    await network.provider.send("evm_increaseTime", [2592000]);
    await network.provider.send("evm_mine");

    // get how much the user can withdraw from the contract of mock_1 tokens using availableCreatorAmountERC20 function which take a creator address and a token address
    const availableAmount1 = await contract.availableCreatorAmountERC20(user_1.address, mock_1.address);

    // get how much the user can withdraw from the contract of mock_2 tokens using availableCreatorAmountERC20 function which take a creator address and a token address
    const availableAmount2 = await contract.availableCreatorAmountERC20(user_1.address, mock_2.address);

    // Withdraw the mock_1 tokens from the contract using the erc20Withdraw function which taken token address, amount and reason

    await contract.connect(user_1).erc20Withdraw(mock_1.address, availableAmount1, "mock_1 tokens");

    // Remove the user
    await contract.removeCreatorERC20Flow(user_1.address);







  });
});


describe("ERC20 rescue function", () => {
  it("Admin gets tokens from faucet, deposits into contract, and then withdraws from contract", async () => {
    // get token one and two from the faucet as admin and deposit into contract
    await mock_1.connect(admin).faucet(admin.address); //faucet 100 tokens to admin

    await mock_1.connect(admin).approve(contract.address, ERC20CAP);


    // Deposit tokens into the contract
    await contract.connect(admin).fundContractERC20(mock_1.address, ERC20CAP);


    // Check that the contract has the correct balance of tokens
    const contractBalance1 = await mock_1.balanceOf(contract.address);

    expect(contractBalance1).to.equal(ERC20CAP);

    //take snapshot of admin balance
    const adminBalance1 = await mock_1.balanceOf(admin.address);
    
    // Withdraw the mock_1 tokens from the contract using the erc20Withdraw function which taken token address, amount and reason
    await contract.connect(admin).erc20WithdrawByAdmin(mock_1.address, ERC20CAP);

    // Check that the admin balance has increased by the amount withdrawn
    const adminBalance2 = await mock_1.balanceOf(admin.address);
    expect(adminBalance2).to.equal(adminBalance1.add(ERC20CAP));

  });
});

describe("Multi-cycle rollover test for erc20 tokens", () => {
  it("Should rollover remaining ERC20 token amount correctly over multiple cycles", async () => {
    // Add a single user with mock_1 tokens
    await contract.addCreatorERC20Flow(user_1.address, [mock_1.address], [ERC20CAP]);

    // Check that the user has been added correctly using allERC20CreatorsData function
    const [returnedTokenAddresses, returnedCaps, _z] = await contract.allERC20CreatorsData(
      [user_1.address],
      [mock_1.address]
    );
    const user_1_token_caps = [returnedCaps[0]];
    expect(user_1_token_caps).to.deep.equal([ERC20CAP]);

    // get token one from the faucet as admin and deposit into contract
    await mock_1.connect(admin).faucet(admin.address);
    await mock_1.connect(admin).approve(contract.address, ERC20CAP);

    // Deposit tokens into the contract
    await contract.connect(admin).fundContractERC20(mock_1.address, ERC20CAP);

    // simulate the passage of time so that is 15 days before the cycle ends
    await network.provider.send("evm_increaseTime", [1296000]);
    await network.provider.send("evm_mine");

    // get how much the user can withdraw from the contract of mock_1 tokens using availableCreatorAmountERC20 function which take a creator address and a token address
    const availableAmount1 = await contract.availableCreatorAmountERC20(user_1.address, mock_1.address);

    // Withdraw the mock_1 tokens from the contract using the erc20Withdraw function which taken token address, amount and reason
    await contract.connect(user_1).erc20Withdraw(mock_1.address, availableAmount1, "mock_1 tokens");

    // simulate the passage of time of 15 days so that the cycle ends and another cycle begins
    await network.provider.send("evm_increaseTime", [1296000]);
    await network.provider.send("evm_mine");

    // get how much the user can withdraw from the contract of mock_1 tokens using availableCreatorAmountERC20 function which take a creator address and a token address
    const availableAmount2 = await contract.availableCreatorAmountERC20(user_1.address, mock_1.address);

    //confirm that the available amount is approximately half of the original amount, not exactly half because of the 1 second difference
    expect(availableAmount2).to.be.equal(halfERC20CAP);


  });
});


  //more rests



});
