require('mocha')
const assert = require('assert');
const { expect } = require('chai');
const hre = require('hardhat');
const secret = require('../secret.json')
Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const {expectRevert} = require('@openzeppelin/test-helpers');

before('deploy', async function (){
    this.SotV1 = await ethers.getContractFactory('SOT');
    this.SotV2 = await ethers.getContractFactory('SOT2');
    this.proxy;
    this.upgraded_SOT;
    
});

it('deploys the Proxy of the SOT Token', async function() {

    this.timeout(500000)
    this.proxy = await hre.upgrades.deployProxy(this.SotV1, {kind: 'uups'}); 
    await this.proxy.deployed();
    assert.equal(await this.proxy.name(), 'Sot')
    console.log('SOT Proxy Deployed!')

})

it('Upgrades the proxy to point to a newer version of the SOT Token', async function(){
    
    this.timeout(500000)
    this.upgraded_SOT = await hre.upgrades.upgradeProxy(this.proxy, this.SotV2)
    await this.upgraded_SOT.deployed();
    assert.equal(await this.upgraded_SOT.version(), 'v2');
    console.log("SOT Upgraded Successfully!")

})

it('deploys the proxy and the upgrade on the same address', async function(){
    assert.equal(this.proxy.address, this.upgraded_SOT.address)
    console.log("The Addresses: ");
    console.log("initial SOT Address: " + this.proxy.address);
    console.log("Upgrade SOT Address: " + this.upgraded_SOT.address)
})

it('should have the name Sot', async function() {

    this.timeout(500000)
    const name = await this.proxy.name();
    assert.equal(name, "Sot");

})

it('should have the symbol SOT', async function() {

    this.timeout(500000)
    const symbol = await this.proxy.symbol();
    assert.equal(symbol, "SOT");

})

it('should return the balance of the passed address', async function() {

    this.timeout(500000)
    const balance = await this.proxy.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log("The balance of this address is: ")
    console.log(balance)

})

it('should return the owner of a token id', async function () {
    this.timeout(500000)
    console.log("The owner of token with token id 1 is: ")
    console.log(await this.proxy.ownerOf(0))
})

it('should return the correct tokenURI', async function () {
    this.timeout(500000)
    const uri = await this.proxy.tokenURI(0);
    assert.equal(uri , "https://res.cloudinary.com/dhxeeeqc8/raw/upload/v1632816504/SOTs/Metadata/0.json")
    console.log("The token URI for token with id 0 is: " + uri)
})

it('should not return the tokenURI of a token that does not exist', async function () {

    this.timeout(500000)
    const lastTokenIdPlusOne = await this.proxy.getCurrentTokenId();
    await assert.rejects(() => this.proxy.tokenURI(lastTokenIdPlusOne));

})

it('should mint a new token and increment the token id and the supply', async function () {

    this.timeout(500000)
    const previousId = await this.proxy.getCurrentTokenId();
    const previousSupply = await this.proxy.getTotalSupply();
    await this.proxy.mint(secret.wallet_address);
    const newId = await this.proxy.getCurrentTokenId();
    const newSupply = await this.proxy.getTotalSupply();
    assert.equal(web3.utils.toNumber(newId), web3.utils.toNumber(previousId) + 1)
    assert.equal(web3.utils.toNumber(newSupply), web3.utils.toNumber(previousSupply) + 1)

})

// it('should reject minting a new token if the minting limit is reached', async function () {

//     this.timeout(500000)
//     const previousSupply = await this.proxy.getTotalSupply();
//     for(var i = 0; i< 1200000 - previousSupply; i++){
//         await this.proxy.mint(secret.wallet_address);
//     }
//     await assert.rejects(() => this.proxy.mint(secret.wallet_address));

// })


it('should burn a token and decrement the supply', async function () {

    this.timeout(500000)
    const Id = await this.proxy.getCurrentTokenId();
    const previousSupply = await this.proxy.getTotalSupply();
    await this.proxy.burn(Id-1);
    const newSupply = await this.proxy.getTotalSupply();
    assert.equal(web3.utils.toNumber(newSupply), web3.utils.toNumber(previousSupply) - 1)

})

it('should return the correct current supply of the NFTs', async function (){
    this.timeout(500000)
    const supply = await this.proxy.getTotalSupply();
    console.log("The current supply is of ", web3.utils.toNumber(supply), " SOTs");
});

it("should return the string format of the passed integer", async function(){
    this.timeout(500000)
    var number = 500000;
    var numberInString = await this.proxy.uint2str(number);
    assert.equal(number + "", numberInString)
    number = 0;
    numberInString = await this.proxy.uint2str(number);
    assert.equal(number + "", numberInString)
})







