const { BitGo } = require("bitgo");

async function getWallet () {
const bitGo = new BitGo({ env: 'test', accessToken: '' }); //login to BitG Test Env
    const coin = bitGo.coin('bgerch'); //ETH token bgerch for swaping 
    const bitGoWallet = await coin.wallets().get({ id: '' }); //set instance to walletId
    console.log(bitGoWallet);

}
getWallet();
