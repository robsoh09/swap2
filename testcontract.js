const { getContractsFactory } = require ('@bitgo/smart-contracts');
const { BitGo } = require ( 'bitgo' );
const hre = require("hardhat");

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
const WETH_ADDRESS = "0xd5C7Fb3C16a026CBc4C22f47518d96131Bd6E1e6";
const FACTORY_ADDRESS = "0xCD30204df696aA62B95593D72e7a619b53085720";
const ROUTER_ADDRESS = "0xa35bdaa6B24484E4fCF1AFdB777cD8871D105847";
const PAIR_ADDRESS = "0x3d913021bE70dfAb088DBFA9644620bE616fb9EF";

// Swap 1 BGERCH to 1 USDT 
async function mint() {

const usdt = getContractsFactory('eth').getContract('StandardERC20').instance('USDT');
const bger = getContractsFactory('eth').getContract('Bgerch').instance('BGER');

console.dir(usdt);
console.log(JSON.stringify(bger, null, 4));


tx = await bger.methods()._mintTERC.call({ amount : "100000000000000000"}); 
console.log(tx);// according to contract _mintTERC is the function  //bn.js string 
tx2 = await bger.methods().transfer.call({ to: "0xaB9f3d7402c43AA472EEE03b176A97DFc920AECd", value : "100000000000000000"}); //transfer to address amount of tokens 
const result = tx2;
console.log(result);     //log result 

}
mint();