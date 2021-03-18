import * as admin from "firebase-admin";

admin.initializeApp();

const functions = {
  metadata: "./endpoints/metadata",
  connectWallet: "./endpoints/connectWallet",
  createNFTContract: "./endpoints/createNFTContract",
};

for (const functionName in functions) {
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(functions[functionName]);
  }
}
