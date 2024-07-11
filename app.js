const { ethers } = require("hardhat");
const { BitGo } = require("bitgo");

// Declare ABI and bytecode for required contracts
const { getContractsFactory } = require("@bitgo/smart-contracts");

// contract addresses 
const XSGD_ADDRESS = "0x3F811bb6e605EF518B0CD9281eB4d9Ad88a3953F";
const BGER_ADDRESS = "0xEBE8B46A42F05072b723b00013ff822B2af1B5cb";
const PAIR_ADDRESS = "0x3d913021bE70dfAb088DBFA9644620bE616fb9EF";

//create BGER/XSGD Liquidity Pool
async function sendBitGoTx() {
  const walletAddress = '0x10258430be2c9db6b22a4c0e6513250967db38e8';
  const amountTokenDesired = 5e18;
  const amountTokenMin = 4e18;
  const amountOutMin = 995e13;
  const deadline = Math.floor(Date.now() / 1000) + 10 * 60;

  const accessToken = 'v2x7bc2261cb6b6cf7d77ee446ca64efd711e86cd0760daf31e2eaeb8eb120c51ea'; //replace with .env or secret mgr in real time  
  const bitGo = new BitGo({ env: 'test', accessToken: `${accessToken}` }); //login to BitG Test Env
  const coin = bitGo.coin('bgerch'); //Bergh 
  const bitGoWallet = await coin.wallets().get({ id: '65938477672fb3f0d6589f564114da1e' }); //set instance to walletId

 const liquidityPoolContract = getContractsFactory('eth').getContract('UniswapV2SwapRouter').instance();

  //  we need to approve the amount of Bgerch for the liquidityPool contract to control
  //const tokenContract = getContractsFactory('eth').getContract('StandardERC20').instance(token);
  const tokenContract = getContractsFactory('eth').getContract('Bgerch').instance('BGER');

  let { data, amount } = tokenContract.methods().approve.call({ spender: liquidityPoolContract.address, value: amountTokenDesired.toString(10) });

  let transaction = await bitGoWallet.send({data: data, amount: amount, address: tokenContract.address,walletPassphrase: 'Evilsia09!@#'});

  console.log(
    `To approve ${amountTokenDesired} ${token} to DAI token contract, send:`,
  );
  console.log(`Data: ${data}`);
  console.log(`Amount: ${amount}`);
  

  ({ data, amount } = liquidityPoolContract.methods().addLiquidityETH.call({
    token: tokenContract.address,
    amountTokenDesired: amountTokenDesired.toString(10),
    amountTokenMin: amountTokenMin.toString(10),
    amountETHMin: amountETHMin.toString(10),
    to: walletAddress,
    deadline,
  }));

  transaction = await bitGoWallet.send({
    data: data, amount: amount, address: liquidityPoolContract.address,
    walletPassphrase: 'walletPassphrase',
    gasLimit: '1000000000'
  });

  console.log(transaction);

}


sendBitGoTx();