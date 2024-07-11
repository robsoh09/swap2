// Importing required modules and libraries from the ethers.js library.
const { Contract, ContractFactory } = require("ethers");

// Importing the contract JSON artifacts.
const WETH9 = require("./WETH9.json");
const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const routerArtifact = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const pairArtifact = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const { ethers } = require("hardhat");

// contract addresses 
const USDT_ADDRESS = "0xb9092EbeAD57B63dF65CaC0C72d669E45B2Abcea";
const FACTORY_ADDRESS = "0xCD30204df696aA62B95593D72e7a619b53085720";
const BGER_ADDRESS = "0xEBE8B46A42F05072b723b00013ff822B2af1B5cb";
// Main deployment function.
async function main() {

  const [owner] = await ethers.getSigners();
  const factory = new Contract(FACTORY_ADDRESS, factoryArtifact.abi, owner)
  //Utilizing the Factory contract, create a trading pair using the addresses of USDT and BGERCH.
  const tx1 = await factory.createPair(USDT_ADDRESS, BGER_ADDRESS);

  // Wait for the transaction to be confirmed on the blockchain.
  const result = await tx1.wait();
  console.log(result);

  // Retrieve the address of the created trading pair from the Factory contract.
  const pairAddress = await factory.getPair(USDT_ADDRESS, BGER_ADDRESS);
  console.log(`Pair deployed to ${pairAddress}`);

  // Initialize a new contract instance for the trading pair using its address and ABI.
  const pair = new Contract(pairAddress, pairArtifact.abi, owner);

  // Initialize a new contract instance for the trading pair using its address and ABI.
// Query the reserves of the trading pair to check liquidity.
let reserves = await pair.getReserves();
console.log(`Reserves: ${reserves[0].toString()}, ${reserves[1].toString()}`);

//show wallet balance
const ethBalance = await provider.getBalance('0xaB9f3d7402c43AA472EEE03b176A97DFc920AECd');
  const usdtBalance = await usdt.balanceOf(owner.address);
  const bgerBalance = await bger.balanceOf(owner.address);
  console.log(ethBalance);
  console.log(usdtBalance);
  console.log(bgerBalance);



  //approving tx to provide liquidity 
  const MaxUint256 =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  const approveTx1 = await usdt.approve(ROUTER_ADDRESS, MaxUint256, {gasLimit: 300000});
  await approveTx1.wait();
  const approvalTx2 = await bger.approve(ROUTER_ADDRESS, MaxUint256, {gasLimit: 300000});
  await approvalTx2.wait();

  const token0Amount = ethers.parseUnits("10");
  const token1Amount = ethers.parseUnits("10");

  const lpTokenBalanceBefore = await pair.balanceOf(owner.address);
  console.log(
    `LP tokens for the owner before: ${lpTokenBalanceBefore.toString()}`
  );

  const deadline = Math.floor(Date.now() / 1000) + 10 * 60;
  const addLiquidityTx = await router
    .connect(owner)
    .addLiquidity(
      USDT_ADDRESS,
      BGER_ADDRESS,
      token0Amount,
      token1Amount,
      0,
      0,
      owner,
      deadline
    );
  const results = await addLiquidityTx.wait();
 console.log(results);






}

// Executing the main function and handling possible outcomes.
main()
  .then(() => process.exit(0)) // Exiting the process if deployment is successful.
  .catch((error) => {
    console.error(error); // Logging any errors encountered during deployment.
    process.exit(1); // Exiting the process with an error code.
  });