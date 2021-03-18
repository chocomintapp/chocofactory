import { ethers } from "ethers";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { signatureMessage } from "../../../common/config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { signature, signerAddress } = data;
  const recoveredAddress = ethers.utils.verifyMessage(`${signatureMessage}${signerAddress}`, signature).toLowerCase();
  const customToken = await admin.auth().createCustomToken(recoveredAddress);
  return customToken;
});
