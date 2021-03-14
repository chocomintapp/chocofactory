import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";
admin.initializeApp();
// const firestore = admin.firestore();

const corsHandler = cors({ origin: true });

export const metadata = functions.region("asia-northeast1").https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const [, contractAddress, tokenId] = req.originalUrl.split("/");
    return res.send({ contractAddress, tokenId });
  });
});
