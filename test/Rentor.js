require('mocha')
const assert = require('assert');
const hre = require('hardhat')


before('deploy', async function (){
    this.Rentor = await ethers.getContractFactory('Rentor');
    this.Rentor2 = await ethers.getContractFactory('Rentor2');
    this.proxy;
    this.upgraded_Rentor;
});

it('deploys the Proxy of the Rentor Token', async function() {
    this.timeout(500000)
    this.proxy = await hre.upgrades.deployProxy(this.Rentor, {kind: 'uups'});
    await this.proxy.deployed();
    console.log('Rentor Proxy Deployed!')

})

it('Upgrades the proxy to point to a newer version of the Rentor contract', async function(){
    this.timeout(500000)
    this.upgraded_Rentor = await hre.upgrades.upgradeProxy(this.proxy, this.Rentor2)
    await this.upgraded_Rentor.deployed();
    assert.equal(await this.upgraded_Rentor.version(), 'v2');
    console.log("Rentor Upgraded Successfully!")

})

it('deploys the proxy and the upgrade on the same address', async function(){
    assert.equal(this.proxy.address, this.upgraded_Rentor.address)
    console.log("The Addresses: ");
    console.log("initial Rentor Address: " + this.proxy.address);
    console.log("Upgrade Rentor Address: " + this.upgraded_Rentor.address)
})






