import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { abi as chocofactoryAbi } from "../../../contracts/artifacts/contracts/Chocofactory.sol/Chocofactory.json";
import { abi as chocomoldAbi } from "../../../contracts/artifacts/contracts/Chocomold.sol/Chocomold.json";
import { NetworkName } from "../../../contracts/helpers/types";
import network from "../../../contracts/network.json";
import { Chocomold, Chocofactory } from "../../../contracts/typechain";

export const networkName = process.env.REACT_APP_NETWORK_NAME
  ? (process.env.REACT_APP_NETWORK_NAME as NetworkName)
  : "localhost";

export const { rpc, chainId, explore, chocofactory, chocomold } = network[networkName];
export const provider = new ethers.providers.JsonRpcProvider(rpc);
export const chocomoldContract = new ethers.Contract(chocomold, chocomoldAbi, provider) as Chocomold;
export const chocofactoryContract = new ethers.Contract(chocofactory, chocofactoryAbi, provider) as Chocofactory;

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

export const getChainIdFromNetworkName = (networkName: NetworkName) => {
  return network[networkName].chainId;
};

export const getNetworkNameFromChainId = (chainId: string) => {
  const result = Object.keys(network).filter((netWorkName) => {
    return network[netWorkName as NetworkName].chainId == chainId;
  });
  console;
  if (result.length > 0) {
    return result[0];
  } else {
    return "invalid";
  }
};
