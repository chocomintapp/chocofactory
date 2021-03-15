import axios from "axios";

import { auth } from "./firebase";
import { initializeWeb3Modal, getWeb3 } from "./web3";

const connectWallet = async () => {
  const provider = await initializeWeb3Modal();
  const web3 = await getWeb3(provider);
  const singerAddress = provider.selectedAddress;
  const message = "signin";
  const signature = await web3.eth.personal.sign(message, singerAddress, "");
  const response = await axios.post("http://localhost:5001/chocofactory-prod/asia-northeast1/connectWallet", {
    signature,
    message,
    singerAddress,
  });
  const customToken = response.data;
  auth.signInWithCustomToken(customToken);
};
