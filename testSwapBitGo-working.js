const { BitGo } = require("bitgo");
const { getContractsFactory } = require("@bitgo/smart-contracts");

// Example to swap from 0.01 ETH to BGER

async function sendBitGoTx() {
  const BGERContractAddress = '0xEBE8B46A42F05072b723b00013ff822B2af1B5cb';
  const amountOutMin = 1e16;
  const wrappedEtherContractAddress = '0xd5C7Fb3C16a026CBc4C22f47518d96131Bd6E1e6';
  const toAddress = '0x10258430be2c9db6b22a4c0e6513250967db38e8';
  const swapRouter = getContractsFactory('eth').getContract('UniswapV2SwapRouter').instance();
  const path = [wrappedEtherContractAddress, BGERContractAddress];
  const deadline = Math.floor(Date.now() / 1000) + 10 * 60;
  const ethAmount = 1e16;

  
  const txInput = swapRouter.methods().swapExactETHForTokens.call({ amountOutMin: amountOutMin.toString(10), path: path, to: toAddress, deadline: deadline });
  txInput.amount = ethAmount.toString(10);
  console.log(`To swap ETH to BGER with  UniwapV2Router contract, send:`);
  console.log(`Data: ${txInput.data}`);
  console.log(`Amount: ${txInput.amount}`);
  console.log(`To: ${swapRouter.address}`);

  const accessToken = '';
  const walletId = ''
  const bitGo = new BitGo({ env: 'test', accessToken: accessToken });
  const baseCoin = bitGo.coin('hteth');
  const bitGoWallet = await baseCoin.wallets().get({ id: walletId });
  
  const transaction = await bitGoWallet.send({
    data: txInput.data, amount: txInput.amount, address: swapRouter.address,
    walletPassphrase: 
    
  });
  
  console.log(transaction)
  const id = transaction.pendingApproval.id;
  console.log(id);
    
  const body = {
 
         "state": "approved"
     }
     const response = await fetch(`http://localhost:3080/api/v2/pendingapprovals/${id}`, {
         method: 'PUT',
         body: JSON.stringify(body),
         headers: {
             'Content-Type': 'application/json',
             'accept': 'application/json',
             'Authorization': 'Bearer '
 
         }
 
     });
     const result = await response.json();
     console.log(result); 
 
     
   
 }
 



sendBitGoTx();
