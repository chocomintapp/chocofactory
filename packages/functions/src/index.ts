import cors from "cors";
import { ethers } from "ethers";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { signInMessage } from "../../common/config.json";
import { NFTContract } from "../../frontend/src/types";
import { getContractsForChainId } from "./modules/web3";

admin.initializeApp();
const firestore = admin.firestore();
const corsHandler = cors({ origin: true });

export const metadata = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const [, nftContractAddress, tokenId] = req.originalUrl.split("/");
    return res.send({ nftContractAddress, tokenId });
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createNFTContract = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { chainId, factoryAddress, moldAddress, name, symbol, signature, signerAddress } = data;
  console.log(chainId);
  const { chocomoldContract, chocofactoryContract } = getContractsForChainId(chainId);
  console.log("1");
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
  console.log("2");
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
  console.log("3");
  await firestore
    .collection("v1")
    .doc(chainId)
    .collection("nftContract")
    .doc(nftContractAddress)
    .set(nftContract)
    .catch((err) => console.log(err));
  console.log("4");
  return { chainId, moldAddress, factoryAddress, nftContractAddress, name, symbol, ownerAddress, signature };
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const connectWallet = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { signature, signerAddress } = data;
  const message = signInMessage;
  const recoveredAddress = ethers.utils.verifyMessage(`${message}${signerAddress}`, signature).toLowerCase();
  const customToken = await admin.auth().createCustomToken(recoveredAddress);
  return customToken;
});
