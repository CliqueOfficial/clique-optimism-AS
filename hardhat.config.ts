import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    // --------------- TESTNETS ---------------
    opgoerli: {
      url: process.env.OPTIMISM_GOERLI_URL || "",
      chainId: 420,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
