require("@nomicfoundation/hardhat-toolbox");

const endpointUrl = "https://holesky.infura.io/v3/";
const privateKey = "";


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
