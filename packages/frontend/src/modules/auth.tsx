import axios from "axios";
import React from "react";
import { atom, useRecoilState } from "recoil";
import { signInMessage } from "../../../common/config.json";
import { auth } from "./firebase";
import { initializeWeb3Modal, getWeb3, getEthersSigner } from "./web3";

export const signerAddressState = atom({
  key: "signerAddress",
  default: "",
});

export const useAuth = () => {
  const [web3, setWeb3] = React.useState<any>();
  const [signer, setSigner] = React.useState<any>();
  const [signerAddress, setsignerAddress] = useRecoilState(signerAddressState);

  const connectWallet = async () => {
    console.log(web3, signer, signerAddress);
    if (!web3 || !signer || !signerAddress) {
      const provider = await initializeWeb3Modal();
      const _signerAddress = provider.selectedAddress;
      const _web3 = await getWeb3(provider);
      const _signer = await getEthersSigner(provider);
      const message = signInMessage;
      const signature = await _web3.eth.personal.sign(message, _signerAddress, "");
      const response = await axios.post("http://localhost:5001/chocofactory-prod/asia-northeast1/connectWallet", {
        signature,
      });
      const customToken = response.data;
      auth.signInWithCustomToken(customToken);
      setsignerAddress(_signerAddress);
      setWeb3(_web3);
      setSigner(_signer);
      return { web3: _web3, signer: _signer, signerAddress: _signerAddress };
    } else {
      return { web3, signer, signerAddress };
    }
  };
  return { web3, signer, signerAddress, connectWallet };
};
