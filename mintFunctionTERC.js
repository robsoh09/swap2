const { getContractsFactory } = require ('@bitgo/smart-contracts');
const hre = require("hardhat");
const  bitgo  = require("bitgo");
const bg = new bitgo.BitGo({ env: 'test'});
const coin = 'bgerch'; //ETH token bgerch for swaping
const walletId = '65938477672fb3f0d6589f564114da1e'
bg.register(coin, bg.createInstance);

// Swap 1 BGERCH to 1 USDT 
async function mint() {

const usdt = getContractsFactory('eth').getContract('StandardERC20').instance('USDT');
const bger = getContractsFactory('eth').getContract('Bgerch').instance('BGER');
const router = getContractsFactory('eth').getContract('Uniswapv2SwapRouter').instance('UniswapV2SwapRouter');

console.log(router);
console.dir(usdt);
console.log(JSON.stringify(bger, null, 4));


tx = await bger.methods()._mintTERC.call({ amount : "100000000000000000"}); 
console.log(tx);// according to contract _mintTERC is the function  //bn.js string 
tx2 = await bger.methods().transfer.call({ to: "0xaB9f3d7402c43AA472EEE03b176A97DFc920AECd", value : "100000000000000000"}); //transfer to address amount of tokens 
const result = tx2;
console.log(result);     //log result 

}
mint();