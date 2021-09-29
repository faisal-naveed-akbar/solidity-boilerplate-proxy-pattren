require('mocha')
const assert = require('assert');
const hre = require('hardhat')


before('deploy', async function (){
    this.MsotV1 = await ethers.getContractFactory('MSOT');
    this.MsotV2 = await ethers.getContractFactory('MSOT2');
    this.proxy;
    this.upgraded_MSOT;
});  


it('deploys the Proxy of the MSOT Token', async function() {
    this.timeout(500000)
    this.proxy = await hre.upgrades.deployProxy(this.MsotV1, {kind: 'uups'}); 
    assert.equal(await this.proxy.name(), 'Msot')
    console.log('MSOT Proxy Deployed!')

})

it('Upgrades the proxy to point to a newer version of the MSOT Token', async function(){
    this.timeout(500000)
    this.upgraded_MSOT = await hre.upgrades.upgradeProxy(this.proxy.address, this.MsotV2)
    await this.upgraded_MSOT.deployed();
    assert.equal(await this.upgraded_MSOT.version(), 'v2');
    console.log("MSOT Upgraded Successfully!")

})

it('deploys the proxy and the upgrade on the same address', async function(){
    assert.equal(this.proxy.address, this.upgraded_MSOT.address)
    console.log("The Addresses: ");
    console.log("initial MSOT Address: " + this.proxy.address);
    console.log("Upgrade MSOT Address: " + this.upgraded_MSOT.address)
})







