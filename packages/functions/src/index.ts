import cors from "cors";
import { ethers } from "ethers";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { chocomoldContract, chocofactoryContract, chainId } from "../../frontend/src/modules/web3";

admin.initializeApp();
const firestore = admin.firestore();

const corsHandler = cors({ origin: true });

export const metadata = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const [, contractAddress, tokenId] = req.originalUrl.split("/");
    return res.send({ contractAddress, tokenId });
  });
});

export const createContract = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { implementation, name, symbol, signature, singerAddress } = data;
  console.log(implementation, name, symbol, signature);
  const functionData = chocomoldContract.interface.encodeFunctionData("initialize", [name, symbol, singerAddress]);
  const messageHash = ethers.utils.solidityKeccak256(
    ["uint256", "address", "address", "bytes"],
    [chainId, chocofactoryContract.address, implementation, functionData]
  );
  const messageHashBinary = ethers.utils.arrayify(messageHash);
  const recoveredAddress = ethers.utils.recoverAddress(messageHashBinary, signature);
  console.log(recoveredAddress);
  return "ok";
  // corsHandler(req, res, async () => {
  //   const [, contractAddress, tokenId] = req.originalUrl.split("/");
  //   return res.send({ contractAddress, tokenId });
  // });
});
