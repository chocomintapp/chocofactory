import cors from "cors";
import { ethers } from "ethers";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { signInMessage } from "../../common/config.json";
import { chocomoldContract, chocofactoryContract, chainId, contractCollectionName } from "./modules/web3";

admin.initializeApp();
const firestore = admin.firestore();

const corsHandler = cors({ origin: true });

export const metadata = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const [, contractAddress, tokenId] = req.originalUrl.split("/");
    return res.send({ contractAddress, tokenId });
  });
});

export const createNFTAddress = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { implementation, name, symbol, signature, signerAddress } = data;
  const ownerAddress = signerAddress.toLocaleLowerCase();
  const functionData = chocomoldContract.interface.encodeFunctionData("initialize", [name, symbol, ownerAddress]);
  const digest = ethers.utils.solidityKeccak256(
    ["uint256", "address", "address", "bytes"],
    [chainId, chocofactoryContract.address, implementation, functionData]
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
  const nftAddress = deployedMold.toLocaleLowerCase();
  const moldAddress = implementation.toLocaleLowerCase();

  await firestore
    .collection(contractCollectionName)
    .doc(nftAddress)
    .set({ name, symbol, ownerAddress, moldAddress, signature });
  return { name, symbol, ownerAddress, moldAddress, signature, nftAddress };
});

export const connectWallet = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { signature, signerAddress } = req.body;
    const message = signInMessage;
    const recoveredAddress = ethers.utils.verifyMessage(`${message}${signerAddress}`, signature).toLowerCase();
    const customToken = await admin.auth().createCustomToken(recoveredAddress);
    res.send(customToken);
  });
});
