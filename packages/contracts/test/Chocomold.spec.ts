import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { MODAL_NAME, MODAL_SYMBOL, NULL_ADDRESS } from "../helpers/constants";
import { main } from "../scripts/98_internalBatchMigration";

chai.use(solidity);
const { expect } = chai;

const tokenId = 1;
const max = 300;

describe("Chocomold", function () {
  let signer, moldContract;

  this.beforeEach("initialization.", async function () {
    [signer] = await ethers.getSigners();
    const { factory, mold } = await main();
    const data = mold.interface.encodeFunctionData("initialize", [MODAL_NAME, MODAL_SYMBOL, signer.address]);
    const deployedMold = await factory.predictDeployResult(signer.address, mold.address, data);
    await factory.deploy(mold.address, data);
    moldContract = mold.attach(deployedMold);
  });
  it("deploy normaly", async function () {
    expect(await moldContract.name()).to.equal(MODAL_NAME);
    expect(await moldContract.symbol()).to.equal(MODAL_SYMBOL);
  });

  it("mint", async function () {
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
  });

  it("bulk mint to 1 recipient", async function () {
    const tokenIdList: number[] = [];
    for (let i = 0; i < max; i++) {
      tokenIdList.push(i);
    }
    await moldContract["mint(address,uint256[])"](signer.address, tokenIdList);
  });

  it("bulk mint to multiple recipient", async function () {
    const toList: string[] = [];
    const tokenIdList: number[] = [];
    for (let i = 0; i < max; i++) {
      tokenIdList.push(i);
      toList.push(signer.address);
    }
    await moldContract["mint(address[],uint256[])"](toList, tokenIdList);
  });
});
