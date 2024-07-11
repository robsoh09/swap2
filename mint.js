const hre = require("hardhat");

async function main() {
  console.log('Getting USDC Contract');
  const usdcAdd = '0x231921b5f91a9a2F5CA95C27dAd343799d29aa01';
  const HUSDC = await hre.ethers.getContractAt("HUSDC", usdcAdd);
  const name = await HUSDC.name();
  console.log("token", name);
  console.log("minting token")
  let tx = await HUSDC.mint("1000000000000000000");
  tx = await HUSDC.transfer("0xaB9f3d7402c43AA472EEE03b176A97DFc920AECd", "1000000000000000000");
  await tx.wait();
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });