const { ethers } = require("hardhat");
const  bitgo  = require("bitgo");
const bg = new bitgo.BitGo({ env: 'test'});
const coin = 'txsgd'; //ETH token bgerch for swaping
const walletId = '65938477672fb3f0d6589f564114da1e'
bg.register(coin, bg.createInstance);

const { getContractsFactory } = require("@bitgo/smart-contracts");

// contract addresses 
const USDT_ADDRESS = "0xb9092EbeAD57B63dF65CaC0C72d669E45B2Abcea";
const FACTORY_ADDRESS = "0xCD30204df696aA62B95593D72e7a619b53085720";
const ROUTER_ADDRESS = "0xa35bdaa6B24484E4fCF1AFdB777cD8871D105847";
const PAIR_ADDRESS = "0xA1D6737578531F427eA587a291C207016813d15F";
const BGER_ADDRESS = "0xEBE8B46A42F05072b723b00013ff822B2af1B5cb";

// Initializing contract instances with their addresses and ABIs using BitGo Smart-Contract SDK 
const router = getContractsFactory('eth').getContract('UniswapV2SwapRouter').instance();
const usdt = getContractsFactory('eth').getContract('StandardERC20').instance('USDT');
const bger = getContractsFactory('eth').getContract('Bgerch').instance('BGER');
console.log(router);

// Main function that will be executed
const main = async () => {

    
    //Adding BitGo Login 
    const accessToken = 'v2x7bc2261cb6b6cf7d77ee446ca64efd711e86cd0760daf31e2eaeb8eb120c51ea';
    bg.authenticateWithAccessToken({ accessToken: `${accessToken}`});
    const bitGoWallet = await bg.coin(coin).wallets().get({ id: `${walletId}` }); //set instance to walletId
   
    
    const tokenName = 'TXSGD';
    const recipient = '0x10258430be2c9db6b22a4c0e6513250967db38e8'; //approve to liquidity Pool and get back. 
    const tokenAmount = '4000000'; // 1 XSGD eg
  
    let approvalTx = { data, amount } = bger.methods().approve.call({ spender: recipient, value: '10000000000000', });
    console.log(approvalTx);
    console.log(`To approve ${tokenAmount} ${tokenName} to ${recipient}:\n`);
    console.log(`Data: ${data}`);
    console.log(`Amount: ${amount} TXSGD`);
    console.log(`To: ${bger.address}`);

    const transaction = await bitGoWallet.send({
        data: approvalTx.data, amount: amount, address: PAIR_ADDRESS,
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