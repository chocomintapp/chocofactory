import * as fs from "fs";
import * as path from "path";
import hre, { ethers } from "hardhat";
import { NetworkName } from "./types";

import { MODAL_NAME, MODAL_SYMBOL, MODAL_BASE_URL, NULL_ADDRESS } from "./constants";

export const filePath = "../network.json";
export const networkName = hre.network.name == "hardhat" ? "localhost" : <NetworkName>hre.network.name;

export const gasPrice = process.env.GASPRICE ? parseInt(process.env.GASPRICE) : 10000000000; //10 gwei

export const readFileAsJson = () => {
  const configsBuffer = fs.readFileSync(path.join(__dirname, filePath));
  return JSON.parse(configsBuffer.toString());
};

export const updateJson = (contractName: string, address: string) => {
  const contractNameLowerString = contractName.toLowerCase();
  networkName != "localhost" && console.log("json update for", contractNameLowerString);
  const configs = readFileAsJson();
  configs[networkName][contractNameLowerString] = address;
  fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(configs));
  networkName != "localhost" && console.log("json updated");
};

export const deployFactory = async () => {
  const contractName = "Chocofactory";
  const Contract = await ethers.getContractFactory(contractName);
  await Contract.deploy({ gasPrice });
  const contract = await Contract.deploy({ gasPrice });
  updateJson(contractName, contract.address);
  return contract;
};

export const deployMold = async () => {
  const contractName = "Chocomold";
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(MODAL_NAME, MODAL_SYMBOL, MODAL_BASE_URL, NULL_ADDRESS, {
    gasPrice,
  });
  updateJson(contractName, contract.address);
  return contract;
};
