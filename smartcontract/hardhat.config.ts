import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PV_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },

};

export default config;
