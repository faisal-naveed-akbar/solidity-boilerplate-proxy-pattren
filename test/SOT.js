require('mocha')
const assert = require('assert');
const hre = require('hardhat')


before('deploy', async function (){
    this.SotV1 = await ethers.getContractFactory('SOT');
    this.SotV2 = await ethers.getContractFactory('SOT2');
    this.proxy;
    this.upgraded_SOT;
});

it('deploys the Proxy of the SOT Token', async function() {

    this.proxy = await hre.upgrades.deployProxy(this.SotV1, {kind: 'uups'}); 
    assert.equal(await this.proxy.name(), 'Sot')
    console.log('SOT Proxy Deployed!')

})

it('Upgrades the proxy to point to a newer version of the SOT Token', async function(){
    
    this.upgraded_SOT = await hre.upgrades.upgradeProxy(this.proxy, this.SotV2)
    assert.equal(await this.upgraded_SOT.version(), 'v2');
    console.log("SOT Upgraded Successfully!")

})

it('deploys the proxy and the upgrade on the same address', async function(){
    assert.equal(this.proxy.address, this.upgraded_SOT.address)
    console.log("The Addresses: ");
    console.log("initial SOT Address: " + this.proxy.address);
    console.log("Upgrade SOT Address: " + this.upgraded_SOT.address)
})






