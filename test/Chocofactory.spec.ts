import { ethers } from "hardhat";
import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { main } from "../scripts/98_internalBatchMigration";

import { MODAL_NAME, MODAL_SYMBOL, MODAL_BASE_URL, NULL_ADDRESS } from "../helpers/constants";

chai.use(solidity);
const { expect } = chai;

const chainId = 31337;

describe("Chocofactory", function () {
  let signer, factoryContract, moldContract;

  this.beforeEach("initialization.", async function () {
    [signer] = await ethers.getSigners();
    const { factory, mold } = await main();
    factoryContract = factory;
    moldContract = mold;
  });
  it("deploy normaly", async function () {
    expect(await moldContract.name()).to.equal(MODAL_NAME);
    expect(await moldContract.symbol()).to.equal(MODAL_SYMBOL);
  });

  it("factory deploy", async function () {
    const data = moldContract.interface.encodeFunctionData("initialize", [MODAL_NAME, MODAL_SYMBOL, NULL_ADDRESS]);
    const deployedMold = await factoryContract.predictDeployResult(signer.address, moldContract.address, data);
    await factoryContract.deploy(moldContract.address, data);
    const deployedMoldContract = moldContract.attach(deployedMold);
    expect(await deployedMoldContract.name()).to.equal(MODAL_NAME);
    expect(await deployedMoldContract.symbol()).to.equal(MODAL_SYMBOL);
  });

  it("factory deployWithSig", async function () {
    const data = moldContract.interface.encodeFunctionData("initialize", [MODAL_NAME, MODAL_SYMBOL, NULL_ADDRESS]);
    const deployedMold = await factoryContract.predictDeployResult(signer.address, moldContract.address, data);
    const messageHash = ethers.utils.solidityKeccak256(
      ["uint256", "address", "address", "bytes"],
      [chainId, factoryContract.address, moldContract.address, data]
    );
    const messageHashBinary = ethers.utils.arrayify(messageHash);
    const signature = await signer.signMessage(messageHashBinary);
    await factoryContract.deployWithSig(moldContract.address, data, signature);
    const deployedMoldContract = moldContract.attach(deployedMold);
    expect(await deployedMoldContract.name()).to.equal(MODAL_NAME);
    expect(await deployedMoldContract.symbol()).to.equal(MODAL_SYMBOL);
  });
});
