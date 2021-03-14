import { ethers } from "hardhat";
import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { main } from "../scripts/98_internalBatchMigration";

import { MODAL_NAME, MODAL_SYMBOL, MODAL_BASE_URL, NULL_ADDRESS } from "../helpers/constants";

chai.use(solidity);
const { expect } = chai;

const chainId = 31337;

describe("Chocomold", function () {
  let signer, factoryContract, moldContractTemplate, moldContract;

  this.beforeEach("initialization.", async function () {
    [signer] = await ethers.getSigners();
    const { factory, mold } = await main();
    factoryContract = factory;
    moldContractTemplate = mold;
    const data = moldContractTemplate.interface.encodeFunctionData("initialize", [
      MODAL_NAME,
      MODAL_SYMBOL,
      NULL_ADDRESS,
    ]);
    const deployedMold = await factoryContract.predictDeployResult(signer.address, moldContract.address, data);
    await factoryContract.deploy(moldContractTemplate.address, data);
    moldContract = moldContractTemplate.attach(deployedMold);
  });

  it("factory deploy", async function () {
    console.log("test");
  });
});
