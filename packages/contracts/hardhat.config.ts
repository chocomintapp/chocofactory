import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-typechain";
import "solidity-coverage";
import "hardhat-gas-reporter";

const privateKey = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000"; // this is to avoid hardhat error

import network from "./network.json";

const enableGasReport = !!process.env.ENABLE_GAS_REPORT;
const enableProduction = process.env.COMPILE_MODE === "production";

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: enableGasReport || enableProduction,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
    },
    mainnet: {
      url: network.mainnet.rpc,
      accounts: [privateKey],
    },
    rinkeby: {
      url: network.rinkeby.rpc,
      accounts: [privateKey],
    },
    matic: {
      url: network.matic.rpc,
      accounts: [privateKey],
    },
    matic_test: {
      url: network.matic_test.rpc,
      accounts: [privateKey],
    },
    bsc: {
      url: network.bsc.rpc,
      accounts: [privateKey],
    },
    bsc_test: {
      url: network.bsc_test.rpc,
      accounts: [privateKey],
    },
    shibuya: {
      url: network.shibuya.rpc,
      accounts: [privateKey],
    },
    shiden: {
      url: network.shiden.rpc,
      accounts: [privateKey],
    },
    aurora_test: {
      url: network.aurora_test.rpc,
      accounts: [privateKey],
    },
    rinkarby: {
      url: network.rinkarby.rpc,
      accounts: [privateKey],
    },
    avalanch_fuji: {
      url: network.avalanch_fuji.rpc,
      accounts: [privateKey],
    },
    optimistic_kovan: {
      url: network.optimistic_kovan.rpc,
      accounts: [privateKey],
    },
    boba_rinkeby: {
      url: network.boba_rinkeby.rpc,
      accounts: [privateKey],
    },
    metis_stardust: {
      url: network.metis_stardust.rpc,
      accounts: [privateKey],
    },
    oasis_testnet: {
      url: network.oasis_testnet.rpc,
      accounts: [privateKey],
    },
    astar: {
      url: network.astar.rpc,
      accounts: [privateKey],
    },
    fantom_test: {
      url: network.fantom_test.rpc,
      accounts: [privateKey],
    },
    fantom: {
      url: network.fantom.rpc,
      accounts: [privateKey],
    },
    forge_test: {
      url: network.forge_test.rpc,
      accounts: [privateKey],
    },
    avalanch_c: {
      url: network.avalanch_c.rpc,
      accounts: [privateKey],
    },
    harmony_test: {
      url: network.harmony_test.rpc,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  gasReporter: {
    enable: enableGasReport,
    currency: "JPY",
    outputFile: process.env.CI ? "gas-report.txt" : undefined,
  },
};
