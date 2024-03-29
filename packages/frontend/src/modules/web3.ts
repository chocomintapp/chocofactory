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
    ? [
        "Local",
        "Goerli",
        "Polygon Test",
        "BSC Test",
        "BSC",
        "Polygon",
        "Mainnet",
        "shibuya",
        "Shiden",
        "Aurora Test",
        "RinkArby",
        "Avalanch Fuji",
        "Optimistic Kovan",
        "Boba Rinkeby",
        "Metis Stardust",
        "Oasis Testnet",
        "Astar",
        "Fantom Testnet",
        "Fantom",
        "Forge Testnet",
        "Avalanch C-Chain",
        "Harmony Testnet (Error)",
        "Ontology Testnet (Error)",
        "Heco Testnet",
        "Cronos Testnet",
        "Moonbase (Error)",
        "Celo Aflojores",
        "Sokol",
        "BitTorrent Chain Donau (Error)",
        "Meter Testnet",
        "Aurora",
        "Telos Testnet",
        "Klaytn Testnet",
        "Velas Testnet (Error)",
        "Arbitrum One",
        "Lappsnet",
        "Evmos Testnet",
        "G.U Sandbox",
        "Hoo Smart Chain",
        "Fuse",
        "IoTeX Testnet",
        "Kovan",
        "Gather Test",
        "Gather",
        "Dogechain Test (Error)",
      ]
    : [
        "Goerli",
        "BSC",
        "Polygon",
        "Mainnet",
        "Shiden",
        "Astar",
        "Fantom",
        "Avalanch C-Chain",
        "Aurora",
        "Arbitrum One",
        "Metis Stardust",
        "Lappsnet",
        "Fuse",
        "Hoo Smart Chain",
        "Kovan",
        "Gather ",
        "Evmos Testnet ",
      ];

export const chainIdValues =
  process.env.NODE_ENV == "development"
    ? ([
        "31337",
        "5",
        "80001",
        "97",
        "56",
        "137",
        "1",
        "81",
        "336",
        "1313161555",
        "421611",
        "43113",
        "69",
        "28",
        "588",
        "42261",
        "592",
        "4002",
        "250",
        "525",
        "43114",
        "1666700000",
        "5851",
        "256",
        "338",
        "1287",
        "44787",
        "77",
        "1029",
        "83",
        "1313161554",
        "41",
        "1001",
        "111",
        "42161",
        "2780",
        "9000",
        "99999",
        "70",
        "122",
        "4690",
        "42",
        "356256156",
        "192837465",
        "568",
      ] as ChainId[])
    : ([
        "5",
        "56",
        "137",
        "1",
        "336",
        "592",
        "250",
        "43114",
        "1313161554",
        "42161",
        "588",
        "2780",
        "122",
        "70",
        "42",
        "192837465",
        "9000",
      ] as ChainId[]);

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "4d076e81503a41c3987acb2940357deb",
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
