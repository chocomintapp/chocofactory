import cors from "cors";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { DB_VIRSION } from "../modules/config";
const firestore = admin.firestore();
const corsHandler = cors({ origin: true });

module.exports = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const [, , chainId, nftContractAddress, tokenId] = req.originalUrl.split("/");
    if (!chainId || !nftContractAddress) {
      return res.send("invalid param");
    }

    if (tokenId) {
      const doc = await firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .collection("metadata")
        .doc(tokenId)
        .get();
      if (!doc.exists) {
        return res.send("metadata not exist");
      }
      const metadata = doc.data() as any;
      metadata.animation_url = metadata.animationUrl;
      metadata.nft_contract_address = metadata.nftContractAddress;
      metadata.token_id = metadata.tokenId;
      delete metadata.animationUrl;
      delete metadata.nftContractAddress;
      delete metadata.tokenId;
      return res.send(metadata);
    } else {
      const doc = await firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .get();
      if (!doc.exists) {
        return res.send("metadata not exist");
      }
      const contract = doc.data() as any;
      const querySnapshot = await firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .collection("metadata")
        .get();
      const metadata: any[] = [];
      querySnapshot.forEach((doc) => {
        metadata.push(doc.data());
      });
      return res.send({ contract, metadata });
    }
  });
});
