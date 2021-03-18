import { ethers } from "ethers";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { NFTContract } from "../../frontend/src/types";
import { getContractsForChainId } from "./modules/web3";
const firestore = admin.firestore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { chainId, factoryAddress, moldAddress, name, symbol, signature, signerAddress } = data;
  const { chocomoldContract, chocofactoryContract } = getContractsForChainId(chainId);
  const ownerAddress = signerAddress.toLocaleLowerCase();
  const functionData = chocomoldContract.interface.encodeFunctionData("initialize", [name, symbol, ownerAddress]);
  const digest = ethers.utils.solidityKeccak256(
    ["uint256", "address", "address", "bytes"],
    [chainId, factoryAddress, moldAddress, functionData]
  );
  const digestBinary = ethers.utils.arrayify(digest);
  const messageDigest = ethers.utils.hashMessage(digestBinary);
  const recoveredAddress = ethers.utils.recoverAddress(messageDigest, signature).toLowerCase();
  if (ownerAddress != recoveredAddress) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with " + "valid signature.");
  }
  const deployedMold = await chocofactoryContract.predictDeployResult(
    ownerAddress,
    chocomoldContract.address,
    functionData
  );
  const nftContractAddress = deployedMold.toLocaleLowerCase();
  const nftContract: NFTContract = {
    chainId,
    moldAddress,
    factoryAddress,
    nftContractAddress,
    name,
    symbol,
    ownerAddress,
    signature,
  };
  await firestore
    .collection("v1")
    .doc(chainId)
    .collection("nftContract")
    .doc(nftContractAddress)
    .set(nftContract)
    .catch((err) => console.log(err));
  return { chainId, moldAddress, factoryAddress, nftContractAddress, name, symbol, ownerAddress, signature };
});
