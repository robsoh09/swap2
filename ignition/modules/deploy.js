const { ethers } = require("hardhat");
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
//deploying USDC and USDT using ether.js with hardhat
async function main() {
    //retrieve signer from hardhat
    const [owner] = await ethers.getSigners();
    console.log(`Deploying the contract with this ${owner.address}`);

    const USDC = await ethers.getContractFactory("UsdcCoin", owner);
    const usdc = await USDC.deploy();
    const usdcAddress = await usdc.getAddress();
    console.log(`USDC deployed to ${usdcAddress}`);

    const USDT = await ethers.getContractFactory("UsdtCoin", owner);
    const usdt = await USDT.deploy();
    const usdtAddress = await usdt.getAddress();
    console.log(`USDT deployed to ${usdtAddress}`);
    
    await usdt.connect(owner).mint(owner.address, ethers.parseEther("1000"));
    await usdc.connect(owner).mint(owner.address, ethers.parseEther("1000"));

    const ownerBalance = await usdt.balanceOf(owner.address);
    console.log(ownerBalance);




}

main();