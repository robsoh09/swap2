const { ethers } = require("hardhat");
const { BitGo } = require("bitgo");

// Declare ABI and bytecode for required contracts
const { getContractsFactory } = require("@bitgo/smart-contracts");

// contract addresses 
const USDT_ADDRESS = "0xb9092EbeAD57B63dF65CaC0C72d669E45B2Abcea";
const PAIR_ADDRESS = "0x3d913021bE70dfAb088DBFA9644620bE616fb9EF";
const BGER_ADDRESS = "0xEBE8B46A42F05072b723b00013ff822B2af1B5cb";
const bgerchArtifact = require("./artifacts/contracts/BGERCH.sol/TERC20.json");

//Adding BitGo Login 

// Initializing contract instances with their addresses and ABIs using BitGo Smart-Contract SDK 
const router = getContractsFactory('eth').getContract('UniswapV2SwapRouter').instance();
const usdt = getContractsFactory('eth').getContract('StandardERC20').instance('USDT');
const bger = getContractsFactory('eth').getContract('Bgerch').instance('BGER');
console.log(router);

// Main function that will be executed
const main = async () => {

  const bgerAmount = '10000000000000000';
  const usdtAmount = '10000000000000000';
  const toAddress = '0x10258430be2c9db6b22a4c0e6513250967db38e8'; //wallet ID 
  const path = [USDT_ADDRESS, BGER_ADDRESS];
  const deadline = Math.floor(Date.now() / 1000) + 10 * 60;
  
  const accessToken = 'v2x7bc2261cb6b6cf7d77ee446ca64efd711e86cd0760daf31e2eaeb8eb120c51ea'; //replace with .env or secret mgr in real time  
const bitGo = new BitGo({ env: 'test', accessToken: `${accessToken}` }); //login to BitG Test Env
const coin = bitGo.coin('bgerch'); //ETH token bgerch for swaping 
const bitGoWallet = await coin.wallets().get({ id: '65938477672fb3f0d6589f564114da1e' }); //set instance to walletId


  // SwapExactTokensForTokens refer to UniswapV2SwapRouter.json for data variables. 
 
  const txInput = router.methods().swapExactTokensForTokens.
  call({ amountOutMin: bgerAmount, amountIn: usdtAmount, path: path, to: toAddress, deadline: deadline });
    txInput.amount = bgerAmount;
    console.log(`To swap BGERG to USDT  with  UniwapV2Router contract, send:`);
    console.log(`Data: ${txInput.data}`);
    console.log(`Amount: ${txInput.amount}`);
    console.log(`To: ${router.address}`);
    console.log(`To: ${path}` )
  

   const transaction = await bitGoWallet.send({
      data: txInput.data, amount: txInput.amount, address: router.address, to: toAddress,
      walletPassphrase: 'Evilsia09!@#',
    });
  
    console.log(transaction);


}; 

// Executing the main function and handling success/failure
main()
  .then(() => process.exit(0)) // Exit script if everything worked
  .catch((error) => {
    console.error(error); // Log any errors
    process.exit(1); // Exit with an error code
  });