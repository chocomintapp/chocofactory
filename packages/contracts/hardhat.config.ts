import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-typechain";
import "solidity-coverage";

const privateKey =
  process.env.PRIVATE_KEY ||
  "0x0000000000000000000000000000000000000000000000000000000000000000"; // this is to avoid hardhat error

const timeout = 50000;

import network from "./network.json";

module.exports = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      timeout,
    },
    hardhat: {
      forking: {
        url: network.mainnet.rpc,
      },
    },
    mainnet: {
      url: network.mainnet.rpc,
      accounts: [privateKey],
    },
    rinkeby: {
      url: network.rinkeby.rpc,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  mocha: {
    timeout,
  },
};
