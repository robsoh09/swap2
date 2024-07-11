const { ethers } = require("hardhat");
const { Contract, ContractFactory } = require("ethers");

// Declare ABI and bytecode for required contracts
const WETH9 = require("./WETH9.json");
const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const routerArtifact = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const pairArtifact = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const usdtArtifact = require("./artifacts/contracts/USDT.sol/Tether.json");
const usdcArtifact = require("./artifacts/contracts/USDC.sol/UsdCoin.json");

// contract addresses 
const USDT_ADDRESS = "0xb9092EbeAD57B63dF65CaC0C72d669E45B2Abcea";
const USDC_ADDRESS = "0xff5Fe844B732033cA1d0D1630043B4cd003933cB";
const FACTORY_ADDRESS = "0xCD30204df696aA62B95593D72e7a619b53085720";
const ROUTER_ADDRESS = "0xa35bdaa6B24484E4fCF1AFdB777cD8871D105847";
const BGER_ADDRESS = "0xEBE8B46A42F05072b723b00013ff822B2af1B5cb";
const PAIR_ADDRESS = "0xcbb241bF3D0F26b5efbEb44833B756476d1B7C7D";

// Main function that will be executed
const main = async () => {

  // Fetching the owner's signer object
// const [owner] = await ethers.getSigners();
   const provider = hre.ethers.provider;
  
// Initializing contract instances with their addresses and ABIs
const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, provider);
const usdt = new Contract(USDT_ADDRESS, usdtArtifact.abi, provider);
const usdc = new Contract(USDC_ADDRESS, usdcArtifact.abi, provider);

const ethBalance = await provider.getBalance('0xaB9f3d7402c43AA472EEE03b176A97DFc920AECd');
  const usdtBalance = await usdt.balanceOf(owner.address);
  const usdcBalance = await usdc.balanceOf(owner.address);
  console.log(ethBalance);
  console.log(usdtBalance);
  console.log(usdcBalance);

  const approveTx = await usdt.connect(owner).approve(ROUTER_ADDRESS, ethers.parseUnits("1", 18));
  const status = await approveTx.wait();
  console.log(status);

 const tx = await router.connect(owner).swapExactTokensForTokens(
    ethers.parseUnits("1", 18),
    0,
    [USDT_ADDRESS, USDC_ADDRESS],
    owner.address,
    Math.floor(Date.now() / 1000) + 60 * 10,
    {
      gasLimit: 1000000,
    }
  );
   // Waiting for the swap transaction to be confirmed
   const txResponse = await tx.wait();
   console.log(txResponse);



  // Logging initial balances
  // Approving the Uniswap router to spend USDT on owner's behalf
 /* const approveTx = await usdt
    .connect(owner)
    .approve(ROUTER_ADDRESS, ethers.parseUnits("2", 18));
  await approveTx.wait();

  // Performing the swap on Uniswap: USDT for USDC
  const tx = await router
    .connect(owner)
    .swapExactTokensForTokens(
      ethers.parseUnits("2", 18),
      0,
      [USDT_ADDRESS, USDC_ADDRESS],
      owner.address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      {
        gasLimit: 1000000,
      }
    );

  // Waiting for the swap transaction to be confirmed
  await tx.wait();

  // Logging final balances after the swap
  await logBalance(owner); */
};

// Executing the main function and handling success/failure
main()
  .then(() => process.exit(0)) // Exit script if everything worked
  .catch((error) => {
    console.error(error); // Log any errors
    process.exit(1); // Exit with an error code
  });