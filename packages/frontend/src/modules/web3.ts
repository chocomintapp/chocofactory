import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { abi as chocofactoryAbi } from "../../../contracts/artifacts/contracts/Chocofactory.sol/Chocofactory.json";
import { abi as chocomoldAbi } from "../../../contracts/artifacts/contracts/Chocomold.sol/Chocomold.json";
import chainIdConfig from "../../../contracts/chainId.json";
import { NetworkName, ChainId } from "../../../contracts/helpers/types";
import networkConfig from "../../../contracts/network.json";
import { Chocomold, Chocofactory } from "../../../contracts/typechain";

export { NULL_ADDRESS } from "../../../contracts/helpers/constants";

export const chainIdLabels =
  process.env.NODE_ENV == "development"
    ? ["Local", "Rinkeby", "Matic Test", "BSC Test", "BSC", "Matic", "Mainnet"]
    : ["Rinkeby", "BSC", "Matic", "Mainnet"];

export const chainIdValues =
  process.env.NODE_ENV == "development"
    ? (["31337", "4", "80001", "97", "56", "137", "1"] as ChainId[])
    : (["4", "56", "137", "1"] as ChainId[]);

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "95f65ab099894076814e8526f52c9149",
    },
  },
};

export const web3Modal = new Web3Modal({
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

export const getNetworkNameFromChainId = (chainId: string): NetworkName => {
  return chainIdConfig[chainId as ChainId] as NetworkName;
};

export const getContractsForChainId = (chainId: string) => {
  const networkName = getNetworkNameFromChainId(chainId);
  const { chocofactory, chocomold, rpc, explore } = networkConfig[networkName];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chocomoldContract = new ethers.Contract(chocomold, chocomoldAbi, provider) as Chocomold;
  const chocofactoryContract = new ethers.Contract(chocofactory, chocofactoryAbi, provider) as Chocofactory;
  return { chocofactoryContract, chocomoldContract, explore, provider };
};
