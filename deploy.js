const { ethers } = require("hardhat");

//deploying USDC and USDT using ether.js with hardhat
async function main() {
    //retrieve signer from hardhat
    const [owner] = await ethers.getSigners();
    console.log(`Deploying the contract with this ${owner.address}`);

    const USDC = await ethers.getContractFactory("HUSDC", owner);
    const usdc = await USDC.deploy("Holesky USDC", "HUSDC");
    const usdcAddress = await usdc.getAddress();
    console.log(`USDC deployed to ${usdcAddress}`);

    const USDT = await ethers.getContractFactory("HUSDT", owner);
    const usdt = await USDT.deploy("Holesky USDT", "HUSDT");
    const usdtAddress = await usdt.getAddress();
    console.log(`USDT deployed to ${usdtAddress}`);
    



}

main();
