import * as admin from "firebase-admin";

admin.initializeApp();

const functions = {
  metadata: "./metadata",
  connectWallet: "./connectWallet",
  createNFTContract: "./createNFTContract",
};

for (const functionName in functions) {
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(functions[functionName]);
  }
}
