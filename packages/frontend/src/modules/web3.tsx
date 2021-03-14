import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { atom, useRecoilState } from "recoil";

import Web3 from "web3";
import Web3Modal from "web3modal";

export const networkName = process.env.REACT_APP_NETWORK_NAME ? process.env.REACT_APP_NETWORK_NAME : "localhost";

const network = require("../../../contracts/network.json");
export const { rpc, chainId, explore, ChocopoundOwnership, Chocopound } = network[networkName];

export const provider = new ethers.providers.JsonRpcProvider(rpc);

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "95f65ab099894076814e8526f52c9149",
    },
  },
};

export const web3Modal = new Web3Modal({
  network: process.env.REACT_APP_NETWORK_NAME ? process.env.REACT_APP_NETWORK_NAME : "",
  providerOptions,
});

export const initializeWeb3Modal = async () => {
  const web3ModalProvider = await web3Modal.connect();
  await web3ModalProvider.enable();
  return web3ModalProvider;
};

export const clearWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
};

export const getEthersSigner = async (provider: any) => {
  const web3EthersProvider = new ethers.providers.Web3Provider(provider);
  return web3EthersProvider.getSigner();
};

// this is only used for signing because torus wallet sign fails for ethers
export const getWeb3 = async (provider: any) => {
  return new Web3(provider);
};

export const selectedAddressState = atom({
  key: "selectedAddress",
  default: "",
});

export const useWallet = () => {
  const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressState);

  const connectWallet = async () => {
    const provider = await initializeWeb3Modal();
    setSelectedAddress(provider.selectedAddress);
    return provider;
  };
  return { selectedAddress, connectWallet };
};
