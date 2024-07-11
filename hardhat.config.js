require("@nomicfoundation/hardhat-toolbox");

const endpointUrl = "https://holesky.infura.io/v3/220c43366e0e47fda9f62c5850cf9cd8";
const privateKey = "1e17aa39641cae3cafc58d671e60fb728c518149bcf0d969beaa774d166b08fa";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500
      }
    }
  },
  networks: {
    holesky: {
      url: endpointUrl,
      accounts: [privateKey],
      gas: 53064000
    },

    }


};
