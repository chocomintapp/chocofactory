import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { MODAL_NAME, MODAL_SYMBOL } from "../helpers/constants";
import { main } from "../scripts/98_internalBatchMigration";

chai.use(solidity);
const { expect } = chai;

const tokenId = 1;
const max = 300;
const defaultBaseUrl = "https://asia-northeast1-chocofactory-prod.cloudfunctions.net/metadata/";
const chainId = 31337;

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

  it("check token URI with default", async function () {
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    expect(await moldContract.tokenURI(tokenId)).to.equal(
      `${defaultBaseUrl}${chainId}/${moldContract.address.toLowerCase()}/${tokenId}`
    );
  });

  it("check token URI after custome URI is set", async function () {
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    const newBaseURL = "https://localhost:3000/";
    await moldContract.setCustomBaseURI(newBaseURL);
    expect(await moldContract.tokenURI(tokenId)).to.equal(`${newBaseURL}${tokenId}`);
  });

  it("check token URI after token URI is set", async function () {
    const dummyMetadataIpfsCid = "QmWmyoMoctfbAaiEs2G46gpeUmhqFRDW6KWo64y5r581Vz";
    const dummyMetadataIpfsHash = "0x7d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f89";
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    await moldContract["setIpfsHash(uint256,bytes32)"](tokenId, dummyMetadataIpfsHash);
    expect(await moldContract.tokenURI(tokenId)).to.equal(`ipfs://${dummyMetadataIpfsCid}`);
    const newBaseURL = "https://localhost:3000/";
    await moldContract.setCustomBaseURI(newBaseURL);
    expect(await moldContract.tokenURI(tokenId)).to.equal(`ipfs://${dummyMetadataIpfsCid}`);
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
