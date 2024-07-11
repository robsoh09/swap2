const { ethers } = require("hardhat");
const { Contract, ContractFactory } = require("ethers");
const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");


//deploying USDC and USDT using ether.js with hardhat
async function main() {
    //retrieve signer from hardhat
    const [owner] = await ethers.getSigners();
    console.log(`Deploying the contract with this ${owner.address}`);

    const Factory = new ContractFactory(
        factoryArtifact.abi,
        factoryArtifact.bytecode,
        owner
      );
      const factory = await Factory.deploy(owner.address);    
      console.log(factory);
      const factoryAddress = await factory.getAddress();
      console.log(`Factory deployed to ${factoryAddress}`);
      const usdcadd = '0x231921b5f91a9a2F5CA95C27dAd343799d29aa01';
      const usdtadd = '0x28bCb2f646E90bA008D74fd482f4fb7490073bA6';
    const tx1 = await factory.createPair(usdcadd, usdtadd);
       await tx1.wait();
      
       const pairAddress = await factory.getPair(usdtAddress, usdcAddress);
       console.log(`Pair deployed to ${pairAddress}`);

}

main();
