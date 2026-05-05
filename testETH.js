const { BitGo } = require("bitgo");
const { getContractsFactory } = require("@bitgo/smart-contracts");

//create /ETH Liquidity Pool
async function sendBitGoTx() {
  
  const walletAddress = '0xaB9f3d7402c43AA472EEE03b176A97DFc920AECd'; //recipient of Liquidity tokens sent 
  const amountTokenDesired = 1e18; // The amount of token to add as liquidity if the WETH/token price is <= msg.value/amountTokenDesired (token depreciates).
  const amountTokenMin = 1e18; // Bounds the extent to which the WETH/token price can go up before the transaction reverts. Must be <= amountTokenDesired.
  const amountETHMin = 1e17; // Bounds the extent to which the token/WETH price can go up before the transaction reverts. Must be <= msg.value.
  const deadline =  Math.floor(Date.now() / 1000) + 10 * 60;;

  const accessToken = '';
  const bitGo = new BitGo({ env: 'test', accessToken: `${accessToken}` });
  const baseCoin = bitGo.coin('bgerch');
  const walletId = ''
  const bitGoWallet = await baseCoin.wallets().get({ id: `${walletId}` });

  const router = getContractsFactory('eth').getContract('UniswapV2SwapRouter').instance();
  const MaxUint256 =   "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  //  we need to approve the amount of DAI for the liquidityPool contract to control
  const tokenContract = getContractsFactory('eth').getContract('StandardERC20').instance('BGER');
  
  
  let { data, amount } = tokenContract.methods().approve.call({ _spender: router.address, _value: amountTokenDesired.toString(10) });

  let transaction = await bitGoWallet.send({ address: '0xEBE8B46A42F05072b723b00013ff822B2af1B5cb', data: data, amount: amount, walletPassphrase: '@#'});

  console.log(
    `To approve ${amountTokenDesired} to token contract, send:`,
  );
  console.log(`Data: ${data}`);
  console.log(`Amount: ${amount}`);
  console.log(transaction)
  

 /* ({ data, amount } = liquidityPoolContract.methods().addLiquidityETH.call({
    token: tokenContract.address,
    amountTokenDesired: amountTokenDesired.toString(10),
    amountTokenMin: amountTokenMin.toString(10),
    amountETHMin: amountETHMin.toString(10),
    to: walletAddress,
    deadline,
  })); */

     
  
  
 /*transaction = await bitGoWallet.send({
    data: data, amount: amount, address: liquidityPoolContract.address,
    walletPassphrase: 'Evilsia09!@#',
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
    console.log(result); */

    
  
}


sendBitGoTx();
