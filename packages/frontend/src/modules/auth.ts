import { atom, useRecoilState } from "recoil";
import { signatureMessage } from "../../../common/config";
import { auth, functions } from "./firebase";
import { initializeWeb3Modal, getWeb3, getEthersSigner } from "./web3";

export const signerAddressAtom = atom({
  key: "signerAddress",
  default: "",
});

export const useAuth = () => {
  const [signerAddressState, setSignerAddressState] = useRecoilState(signerAddressAtom);

  const connectWallet = async () => {
    const provider = await initializeWeb3Modal();
    const signerAddress = provider.selectedAddress.toLowerCase();
    const web3 = await getWeb3(provider);
    const signer = await getEthersSigner(provider);
    if (signerAddressState != signerAddress) {
      const message = signatureMessage;
      const signature = await web3.eth.personal.sign(`${message}${signerAddress}`, signerAddress, "");

      const response = await functions.httpsCallable("connectWallet")({
        signature,
        signerAddress,
      });
      // const response = await axios.post("http://localhost:5001/chocofactory-prod/asia-northeast1/connectWallet", {
      //   signature,
      //   signerAddress,
      // });
      const customToken = response.data;
      auth.signInWithCustomToken(customToken);
      setSignerAddressState(signerAddress);
    }
    return { web3, signer, signerAddress };
  };

  const disconnectWallet = () => {
    console.log("log out...");
  };
  return { signerAddressState, connectWallet, disconnectWallet };
};
