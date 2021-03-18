import cors from "cors";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const firestore = admin.firestore();
const corsHandler = cors({ origin: true });

module.exports = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const [, chainId, nftContractAddress, tokenId] = req.originalUrl.split("/");
    const doc = await firestore
      .collection("v1")
      .doc(chainId)
      .collection("nftContract")
      .doc(nftContractAddress)
      .collection("metadata")
      .doc(tokenId)
      .get();
    return res.send(doc.data());
  });
});
