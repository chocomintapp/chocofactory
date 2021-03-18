import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { MODAL_NAME, MODAL_SYMBOL, HAS_SECONRARY_SALE_FEES } from "../helpers/constants";
import { main } from "../scripts/98_internalBatchMigration";

chai.use(solidity);
const { expect } = chai;

const tokenId = 1;
const mintLimit = 313;
const royalityLimit = 99;
const ipfsLimit = 313;
const defaultBaseUrl = "https://asia-northeast1-chocofactory-prod.cloudfunctions.net/metadata/";
const chainId = 31337;

describe("Chocomold", function () {
  let signer, creatorSigner, moldContract;

  this.beforeEach("initialization.", async function () {
    [signer, creatorSigner] = await ethers.getSigners();
    const { factory, mold } = await main();
    const data = mold.interface.encodeFunctionData("initialize", [MODAL_NAME, MODAL_SYMBOL, signer.address]);
    const deployedMold = await factory.predictDeployResult(signer.address, mold.address, data);
    await factory.deploy(mold.address, data);
    moldContract = mold.attach(deployedMold);
  });
  it("interface check", async function () {
    expect(await moldContract.supportsInterface(HAS_SECONRARY_SALE_FEES)).to.equal(true);
  });
  it("get no royality when no default, no custom", async function () {
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    const feeRecipientsResult = await moldContract.getFeeRecipients(tokenId);
    const feeBps = await moldContract.getFeeBps(tokenId);
    expect(feeRecipientsResult.length).to.equal(0);
    expect(feeBps.length).to.equal(0);
  });
  it("get default royality when default set, no custom", async function () {
    const defaultRoyaltyAddress = [signer.address];
    const defaultRoyalty = [100];
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    await moldContract.setDefaultRoyality(defaultRoyaltyAddress, defaultRoyalty);
    const feeRecipientsResult = await moldContract.getFeeRecipients(tokenId);
    const feeBps = await moldContract.getFeeBps(tokenId);
    for (let i = 0; i < defaultRoyaltyAddress.length; i++) {
      expect(feeRecipientsResult[i]).to.equal(defaultRoyaltyAddress[i]);
      expect(feeBps[i]).to.equal(defaultRoyalty[i]);
    }
  });
  it("get custom royality when no default, custom set", async function () {
    const customRoyaltyAddress = [signer.address, creatorSigner.address];
    const customRoyalty = [100, 100];
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    await moldContract["setCustomRoyality(uint256,address[],uint256[])"](tokenId, customRoyaltyAddress, customRoyalty);
    const feeRecipientsResult = await moldContract.getFeeRecipients(tokenId);
    const feeBps = await moldContract.getFeeBps(tokenId);
    for (let i = 0; i < customRoyaltyAddress.length; i++) {
      expect(feeRecipientsResult[i]).to.equal(customRoyaltyAddress[i]);
      expect(feeBps[i]).to.equal(customRoyalty[i]);
    }
  });
  it("get custom royality when default set, custom set", async function () {
    const defaultRoyaltyAddress = [signer.address];
    const defaultRoyalty = [100];
    const customRoyaltyAddress = [signer.address, creatorSigner.address];
    const customRoyalty = [100, 100];
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    await moldContract.setDefaultRoyality(defaultRoyaltyAddress, defaultRoyalty);
    await moldContract["setCustomRoyality(uint256,address[],uint256[])"](tokenId, customRoyaltyAddress, customRoyalty);
    const feeRecipientsResult = await moldContract.getFeeRecipients(tokenId);
    const feeBps = await moldContract.getFeeBps(tokenId);
    for (let i = 0; i < customRoyaltyAddress.length; i++) {
      expect(feeRecipientsResult[i]).to.equal(customRoyaltyAddress[i]);
      expect(feeBps[i]).to.equal(customRoyalty[i]);
    }
  });
  it("mint", async function () {
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    expect(await moldContract.ownerOf(tokenId)).to.equal(signer.address);
  });
  it("get token URI from ipfs when ipfs set", async function () {
    const dummyMetadataIpfsCid = "QmWmyoMoctfbAaiEs2G46gpeUmhqFRDW6KWo64y5r581Vz";
    const dummyMetadataIpfsHash = "0x7d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f89";
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    await moldContract["setIpfsHash(uint256,bytes32)"](tokenId, dummyMetadataIpfsHash);
    expect(await moldContract.tokenURI(tokenId)).to.equal(`ipfs://${dummyMetadataIpfsCid}`);
  });
  it("get token URI from custom base url when no ipfs, custom base url set", async function () {
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    const newBaseURL = "https://localhost:3000/";
    await moldContract.setCustomBaseURI(newBaseURL);
    expect(await moldContract.tokenURI(tokenId)).to.equal(`${newBaseURL}${tokenId}`);
  });
  it("get token URI from default base url when no ipfs, no custom base url", async function () {
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    expect(await moldContract.tokenURI(tokenId)).to.equal(
      `${defaultBaseUrl}${chainId}/${moldContract.address.toLowerCase()}/${tokenId}`
    );
  });
  it("revert token url when token not exist", async function () {
    await expect(moldContract.tokenURI(tokenId)).to.revertedWith("token must exist");
  });
  it("bulk mint", async function () {
    const tokenIdList: number[] = [];
    const toList: string[] = [];
    for (let i = 0; i < mintLimit; i++) {
      tokenIdList.push(i);
      toList.push(signer.address);
    }
    await moldContract["mint(address[],uint256[])"](toList, tokenIdList);
  });

  it("bulk mint, bulk set royality", async function () {
    const tokenIdList: number[] = [];
    const toList: string[] = [];
    const royalityAddressList: string[][] = [];
    const royalityList: number[][] = [];
    for (let i = 0; i < royalityLimit; i++) {
      tokenIdList.push(i);
      toList.push(signer.address);
      royalityAddressList.push([signer.address]);
      royalityList.push([100]);
    }
    await moldContract["mint(address[],uint256[])"](toList, tokenIdList);
    await moldContract["setCustomRoyality(uint256[],address[][],uint256[][])"](
      tokenIdList,
      royalityAddressList,
      royalityList
    );
  });

  it("bulk mint, bulk set ipfs", async function () {
    const tokenIdList: number[] = [];
    const toList: string[] = [];
    const ipfsHashList: string[] = [];
    const dummyMetadataIpfsHash = "0x7d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f89";
    for (let i = 0; i < ipfsLimit; i++) {
      tokenIdList.push(i);
      toList.push(signer.address);
      ipfsHashList.push(dummyMetadataIpfsHash);
    }
    await moldContract["mint(address[],uint256[])"](toList, tokenIdList);
    await moldContract["setIpfsHash(uint256[],bytes32[])"](tokenIdList, ipfsHashList);
  });

  it("check burn is possible and deleted royality and ipfs", async function () {
    const customRoyaltyAddress = [signer.address, creatorSigner.address];
    const customRoyalty = [100, 100];
    const dummyMetadataIpfsHash = "0x7d5a99f603f231d53a4f39d1521f98d2e8bb279cf29bebfd0687dc98458e7f89";
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    await moldContract["setCustomRoyality(uint256,address[],uint256[])"](tokenId, customRoyaltyAddress, customRoyalty);
    await moldContract["setCustomRoyality(uint256,address[],uint256[])"](tokenId, customRoyaltyAddress, customRoyalty);
    await moldContract["setIpfsHash(uint256,bytes32)"](tokenId, dummyMetadataIpfsHash);
    await moldContract.burn(tokenId);
    await expect(moldContract.ownerOf(tokenId)).to.revertedWith("ERC721: owner query for nonexistent token");
    const feeRecipientsResult = await moldContract.getFeeRecipients(tokenId);
    const feeBps = await moldContract.getFeeBps(tokenId);
    expect(feeRecipientsResult.length).to.equal(0);
    expect(feeBps.length).to.equal(0);
    await moldContract["mint(address,uint256)"](signer.address, tokenId);
    `${defaultBaseUrl}${chainId}/${moldContract.address.toLowerCase()}/${tokenId}`;
    await moldContract.burn(tokenId); // this is for coverage: HasSecondarySaleFees: burn
  });
});
