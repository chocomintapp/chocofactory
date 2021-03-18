import { ethers } from "ethers";

import { abi as chocofactoryAbi } from "../../../contracts/artifacts/contracts/Chocofactory.sol/Chocofactory.json";
import { abi as chocomoldAbi } from "../../../contracts/artifacts/contracts/Chocomold.sol/Chocomold.json";
import chainIdConfig from "../../../contracts/chainId.json";
import networkConfig from "../../../contracts/network.json";

import { Chocomold, Chocofactory } from "../../../contracts/typechain";

export const getContractsForChainId = (chainId: string) => {
  const networkName = chainIdConfig[chainId];
  const { chocofactory, chocomold, rpc } = networkConfig[networkName];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chocomoldContract = new ethers.Contract(chocomold, chocomoldAbi, provider) as Chocomold;
  const chocofactoryContract = new ethers.Contract(chocofactory, chocofactoryAbi, provider) as Chocofactory;
  return { chocofactoryContract, chocomoldContract };
};
