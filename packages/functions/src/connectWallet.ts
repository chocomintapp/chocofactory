import { ethers } from "ethers";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { signInMessage } from "../../common/config.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { signature, signerAddress } = data;
  const message = signInMessage;
  const recoveredAddress = ethers.utils.verifyMessage(`${message}${signerAddress}`, signature).toLowerCase();
  const customToken = await admin.auth().createCustomToken(recoveredAddress);
  return customToken;
});
