const { ethers } = require("hardhat");
const { Contract, ContractFactory } = require("ethers");
const { BitGo } = require("bitgo");

// Declare ABI and bytecode for required contracts
const WETH9 = require("./WETH9.json");
const XSGD = require("./XSGD.json");
const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const routerArtifact = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const pairArtifact = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const bgerchArtifact = require("./artifacts/contracts/BGERCH.sol/TERC20.json");
const usdtArtifact = require("./artifacts/contracts/USDT.sol/Tether.json");
const usdcArtifact = require("./artifacts/contracts/USDC.sol/UsdCoin.json");

// contract addresses 
const XSGD_ADDRESS = "0x3F811bb6e605EF518B0CD9281eB4d9Ad88a3953F";
const FACTORY_ADDRESS = "0xCD30204df696aA62B95593D72e7a619b53085720";
const ROUTER_ADDRESS = "0xa35bdaa6B24484E4fCF1AFdB777cD8871D105847";
const BGER_ADDRESS = "0xEBE8B46A42F05072b723b00013ff822B2af1B5cb";
//const PAIR_ADDRESS = "0xA1D6737578531F427eA587a291C207016813d15F";
const PAIR_ADDRESS = "0x3d913021bE70dfAb088DBFA9644620bE616fb9EF";
const USDT_ADDRESS = "0xb9092EbeAD57B63dF65CaC0C72d669E45B2Abcea";
const USDC_ADDRESS = "0xff5Fe844B732033cA1d0D1630043B4cd003933cB";
// Initializing contract instances with their addresses and ABIs

const main = async () => {

  // Fetching the owner's signer object
const [owner] = await ethers.getSigners();
const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, owner);
//const xsgd = new Contract(XSGD_ADDRESS, XSGD.abi, owner);
const usdt = new Contract(USDT_ADDRESS, usdtArtifact.abi, owner);
const bger = new Contract(BGER_ADDRESS, bgerchArtifact.abi, owner);
const factory = new Contract(FACTORY_ADDRESS, factoryArtifact.abi, owner)
const pair = new Contract(PAIR_ADDRESS, pairArtifact.abi, owner)
const usdc = new Contract(USDC_ADDRESS, usdtArtifact.abi, owner);

// Initialize a new contract instance for the trading pair using its address and ABI.
// Query the reserves of the trading pair to check liquidity.
let reserves = await pair.getReserves();
console.log(`Reserves: ${reserves[0].toString()}, ${reserves[1].toString()}`);

//show wallet balance
  const bgerBalance = await bger.balanceOf(owner.address);
  console.log(bgerBalance);



  //approving tx to provide liquidity 
  const MaxUint256 =   "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const approvalTx1 = await usdc.approve(ROUTER_ADDRESS, MaxUint256, {gasLimit: 300000});
  await approvalTx1.wait();

  const approvalTx2 = await usdt.approve(ROUTER_ADDRESS, MaxUint256, {gasLimit: 300000});
  await approvalTx2.wait();

  const token0Amount = ethers.parseUnits("5");
  const token1Amount = ethers.parseUnits("5");
  const amount0TokenMin = ethers.parseUnits("2");
  const amount1TokenMin = ethers.parseUnits("2");
  const lpTokenBalanceBefore = await pair.balanceOf(owner.address);
  console.log(
    `LP tokens for the owner before: ${lpTokenBalanceBefore.toString()}`
  );

  const deadline = Math.floor(Date.now() / 1000) + 10 * 60;
  const addLiquidityTx = await router
    .connect(owner)
    .addLiquidity(
      USDC_ADDRESS,
      USDT_ADDRESS,
      token0Amount,
      token1Amount,
      amount0TokenMin,
      amount1TokenMin,
      PAIR_ADDRESS,
      deadline,
      {gasLimit: 300000}
    );
  const results = await addLiquidityTx.wait();
 console.log(results);








  
};

// Executing the main function and handling success/failure
main()
  .then(() => process.exit(0)) // Exit script if everything worked
  .catch((error) => {
    console.error(error); // Log any errors
    process.exit(1); // Exit with an error code
  });