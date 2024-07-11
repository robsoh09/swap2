const { BitGo } = require("bitgo");

async function getWallet () {
const bitGo = new BitGo({ env: 'test', accessToken: '0xcbb241bF3D0F26b5efbEb44833B756476d1B7C7D' }); //login to BitG Test Env
    const coin = bitGo.coin('bgerch'); //ETH token bgerch for swaping 
    const bitGoWallet = await coin.wallets().get({ id: '65938477672fb3f0d6589f564114da1e' }); //set instance to walletId
    console.log(bitGoWallet);

}
getWallet();
