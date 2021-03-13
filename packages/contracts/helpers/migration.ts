import * as fs from "fs";
import * as path from "path";
import hre, { ethers } from "hardhat";
import { NetworkName } from "../type";

export const filePath = "../network.json";

export const getNetwork = () => {
  return hre.network.name == "hardhat"
    ? "localhost"
    : (hre.network.name as NetworkName);
};

export const networkName = getNetwork();

export const gasPrice = process.env.GASPRICE
  ? parseInt(process.env.GASPRICE)
  : 10000000000; //10 gwei

export const readFileAsJson = () => {
  const configsBuffer = fs.readFileSync(path.join(__dirname, filePath));
  return JSON.parse(configsBuffer.toString());
};

export const updateJson = (target: string, address: string) => {
  networkName != "localhost" && console.log("json update for", target);
  const configs = readFileAsJson();
  configs[networkName][target] = address;
  fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(configs));
  networkName != "localhost" && console.log("json updated");
};

export const deploy = async (
  contractName: string,
  params?: string | number[]
) => {
  networkName != "localhost" &&
    console.log("contract deploy for", contractName);
  const Contract = await ethers.getContractFactory(contractName);

  const contract = params
    ? await Contract.deploy(...params, { gasPrice })
    : await Contract.deploy({ gasPrice });
  networkName != "localhost" &&
    console.log(
      "contract deployed",
      contract.deployTransaction.hash,
      contract.address
    );
  return contract;
};

export const deployFactory = async () => {
  const target = "Chocofactory";
  const contract = await deploy(target);
  updateJson(target, contract.address);
  return contract;
};

export const deployTemplate = async () => {
  const target = "Chocotemplate";
  const contract = await deploy(target);
  updateJson(target, contract.address);
  return contract;
};
