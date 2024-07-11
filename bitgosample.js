
const { BitGo } = require("bitgo");
const { getContractsFactory } = require("@bitgo/smart-contracts");

// Example to swap BGERCH to USDT

async function sendBitGoTx() {
  const BGER_Address = '0xEBE8B46A42F05072b723b00013ff822B2af1B5cb';
  const USDT_Address = '0xb9092EbeAD57B63dF65CaC0C72d669E45B2Abcea';
  const amountOutMin = 1e17;
  const toAddress = '0x10258430be2c9db6b22a4c0e6513250967db38e8';
  const router = getContractsFactory('eth').getContract('UniswapV2SwapRouter').instance();
  const path = [USDT_Address, BGER_Address];
  const deadline = Math.floor(Date.now() / 1000) + 10 * 60;
  const BGAmount = 1e17;


const txInput = router.methods().swapExactTokensForTokens.call({ amountOutMin: amountOutMin.toString(10), amountIn: amountIn.toString(10), path: path, to: toAddress, deadline: deadline,
    gasLimit: 1000000,   });

  txInput.amount = BGAmount.toString(10);
  console.log(`To swap BG to USDT with  UniwapV2Router contract, send:`);
  console.log(`Data: ${txInput.data}`);
  console.log(`Amount: ${txInput.amount}`);
  console.log(`To: ${router.address}`); 




  const accessToken = 'v2x7bc2261cb6b6cf7d77ee446ca64efd711e86cd0760daf31e2eaeb8eb120c51ea';
  const bitGo = new BitGo({ env: 'test', accessToken: `${accessToken}` });
  const baseCoin = bitGo.coin('bgerch');
  const bitGoWallet = await baseCoin.wallets().get({ id: '65938477672fb3f0d6589f564114da1e' });

  
  const transaction = await bitGoWallet.send({
    data: txInput.data, amount: txInput.amount, address: router.address,
    walletPassphrase: 'Evilsia09!@#',
  });

  console.log(transaction);
}






sendBitGoTx();