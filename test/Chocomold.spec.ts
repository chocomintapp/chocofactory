import { ethers } from "hardhat";
import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { main } from "../scripts/98_internalBatchMigration";

import { MODAL_NAME, MODAL_SYMBOL, MODAL_BASE_URL, NULL_ADDRESS } from "../helpers/constants";

chai.use(solidity);
const { expect } = chai;

describe("Chocomold", function () {
  let signer, factoryContract, moldContract;

  const name = "name";
  const symbol = "symbol";
  const baseURL = "https://localhost:3000/metadata/";

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
  it("deploy by nodejs script", async function () {
    console.log("deploy normaly");
  });
  it("deploy by minimal factory", async function () {
    console.log("deploy normaly");
  });
});
