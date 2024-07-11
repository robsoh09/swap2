const { BitGo } = require("bitgo");
const { getContractsFactory } = require("@bitgo/smart-contracts");

async function sendBitGoTx() {
    const walletAddress = ''; // send the swapped token 
    const amountTokenDesired = 3e18; //amount of tokens required
    const amountTokenMin = 1e18; //min amount 
    const amountETHMin = 3e18;
    const deadline = Math.floor(Date.now() / 1000) + 10 * 60;
 
    const accessToken = 'v2xa7cfe1d712309ee3b833eb07fd979c7ac0d0164a881e4b98c8fd56ac1a3174d7';
    const bitGo = new BitGo({ env: 'test', accessToken: `${accessToken}` });
    const baseCoin = bitGo.coin('bgerch');
    const walletId = '65938477672fb3f0d6589f564114da1e'
    const bitGoWallet = await baseCoin.wallets().get({ id: `${walletId}` });
    
    const liquidityPoolContract = getContractsFactory('eth').getContract('UniswapV2SwapRouter').instance();
    
    //  we need to approve the amount of BGERCH for the liquidityPool contract to control
    const tokenContract = getContractsFactory('eth').getContract('Bgerch').instance('BGER');
    
    let tx1 = { data, amount } = tokenContract.methods().approve.call({
      spender: liquidityPoolContract.address,
      value: amount
    });
    console.log(tx1)
     
    let transaction = await bitGoWallet.send({
        data: data, amount: "0", address: tokenContract.address,
        walletPassphrase: 'Evilsia09!@#',
      });
    console.log(transaction);
  
  /* ({ data, amount } = liquidityPoolContract.methods().addLiquidityETH.call({
      token: tokenContract.address,
      amountTokenDesired: amountTokenDesired.toString(10),
      amountTokenMin: amountTokenMin.toString(10),
      amountETHMin: amountETHMin.toString(10),
      to: walletAddress,
      deadline,
    }));
  
    transaction = await bitGoWallet.send({
      data: data, amount: amountTokenDesired.toString(10), address: liquidityPoolContract.address,
      walletPassphrase: 'Evilsia09!@#',
    });
  
    console.log(JSON.stringify(transaction, null, 4));

  */
  }
  
  
  sendBitGoTx();