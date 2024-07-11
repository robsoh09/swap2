//contract interaction + mint tokens to Metamask address
const hre = require("hardhat");
//const BGERCH = require("./BGERCH.json"); need to troubleshoot - not working 

async function main() {
  console.log('Getting bger Contract'); // interact with BitGo BEGRP Holesky Contract 
  const BGER_ADDRESS = '0xEBE8B46A42F05072b723b00013ff822B2af1B5cb'; // set contract address 
  const bger = await hre.ethers.getContractAt("TERC20", BGER_ADDRESS); // connect to contract instance name in Solidity-> contract TERC20 is ERC20 
  const name = await bger.name(); //  pull to name of token 
  console.log("token", name);  
  console.log("minting token") //start of  mint process 
  let tx = await bger._mintTERC("2000000000000000000"); // according to contract _mintTERC is the function 
  tx = await bger.transfer("0xaB9f3d7402c43AA472EEE03b176A97DFc920AECd", "2000000000000000000"); //transfer to address amount of tokens 
  const result = await tx.wait();                                                         
  console.log(result);     //log result 
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
