const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy Contract", function (){

it("Deploy contract", async function () {
    const [owner] = await ethers.getSigners();
    console.log(`Deploying the contract with this ${owner.address}`);

    const USDC = await ethers.getContractFactory("HUSDC", owner);
    const usdc = await USDC.deploy('Holesky USDC', 'HUSDC');
    const usdcAddress = await usdc.getAddress();
    console.log(`USDC deployed to ${usdcAddress}`);

    const USDT = await ethers.getContractFactory("HUSDT", owner);
    const usdt = await USDT.deploy('Holesky USDT', 'HUSDT');
    const usdtAddress = await usdt.getAddress();
    console.log(`USDT deployed to ${usdtAddress}`);
    


});




});
