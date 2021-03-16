import { ethers } from "ethers";
import { abi as chocofactoryAbi } from "../../../contracts/artifacts/contracts/Chocofactory.sol/Chocofactory.json";
import { abi as chocomoldAbi } from "../../../contracts/artifacts/contracts/Chocomold.sol/Chocomold.json";
import { NetworkName } from "../../../contracts/helpers/types";
import network from "../../../contracts/network.json";
import { Chocomold, Chocofactory } from "../../../contracts/typechain";

export { NFTContract } from "../../../frontend/src/types";

export const networkName = process.env.FUNCTION_APP_NETWORK_NAME
  ? (process.env.FUNCTION_APP_NETWORK_NAME as NetworkName)
  : "localhost";
export const { rpc, chainId, explore, chocofactory, chocomold } = network[networkName];
export const provider = new ethers.providers.JsonRpcProvider(rpc);
export const chocomoldContract = new ethers.Contract(chocomold, chocomoldAbi, provider) as Chocomold;
export const chocofactoryContract = new ethers.Contract(chocofactory, chocofactoryAbi, provider) as Chocofactory;
