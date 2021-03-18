import { ethers } from "ethers";

import { abi as chocofactoryAbi } from "../../../contracts/artifacts/contracts/Chocofactory.sol/Chocofactory.json";
import { abi as chocomoldAbi } from "../../../contracts/artifacts/contracts/Chocomold.sol/Chocomold.json";
import network from "../../../contracts/network.json";

import { Chocomold, Chocofactory } from "../../../contracts/typechain";

export const getContractsForChainId = (chainId: string) => {
  const result = Object.keys(network).filter((netWorkName) => {
    return network[netWorkName].chainId == chainId;
  });
  const { chocofactory, chocomold, rpc } = network[result[0]];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const chocomoldContract = new ethers.Contract(chocomold, chocomoldAbi, provider) as Chocomold;
  const chocofactoryContract = new ethers.Contract(chocofactory, chocofactoryAbi, provider) as Chocofactory;
  return { chocofactoryContract, chocomoldContract };
};
