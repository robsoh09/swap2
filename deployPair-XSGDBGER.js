// Importing required modules and libraries from the ethers.js library.
const { Contract, ContractFactory } = require("ethers");

// Importing the contract JSON artifacts.
const WETH9 = require("./WETH9.json");
const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const routerArtifact = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const pairArtifact = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const { ethers } = require("hardhat");

// contract addresses 
const XSGD_ADDRESS = "0x3F811bb6e605EF518B0CD9281eB4d9Ad88a3953F";
const FACTORY_ADDRESS = "0xCD30204df696aA62B95593D72e7a619b53085720";
const BGER_ADDRESS = "0xEBE8B46A42F05072b723b00013ff822B2af1B5cb";
// Main deployment function.
async function main() {

  const [owner] = await ethers.getSigners();
  const factory = new Contract(FACTORY_ADDRESS, factoryArtifact.abi, owner)
  //Utilizing the Factory contract, create a trading pair using the addresses of USDT and BGERCH.
  const tx1 = await factory.createPair(XSGD_ADDRESS, BGER_ADDRESS);

  // Wait for the transaction to be confirmed on the blockchain.
  const result = await tx1.wait();
  console.log(result);

  // 15. Retrieve the address of the created trading pair from the Factory contract.
  const pairAddress = await factory.getPair(XSGD_ADDRESS, BGER_ADDRESS);
  console.log(`Pair deployed to ${pairAddress}`);

  // 16. Initialize a new contract instance for the trading pair using its address and ABI.
  const pair = new Contract(pairAddress, pairArtifact.abi, owner);

  // 17. Query the reserves of the trading pair to check liquidity.
  let reserves = await pair.getReserves();
  console.log(`Reserves: ${reserves[0].toString()}, ${reserves[1].toString()}`);

}
// Executing the main function and handling possible outcomes.
main()
  .then(() => process.exit(0)) // Exiting the process if deployment is successful.
  .catch((error) => {
    console.error(error); // Logging any errors encountered during deployment.
    process.exit(1); // Exiting the process with an error code.
  });