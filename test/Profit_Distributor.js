require('mocha')
const assert = require('assert');
const hre = require('hardhat')

before('deploy', async function (){
    this.Profit_Distributor = await ethers.getContractFactory('Profit_Distributor');
    this.Profit_Distributor2 = await ethers.getContractFactory('Profit_Distributor2');
    this.proxy;
    this.upgraded_Profit_Distributor;
});

it('deploys the Proxy of the Profit_Distributor Token', async function() {
    this.timeout(500000)
    this.proxy = await hre.upgrades.deployProxy(this.Profit_Distributor, {kind: 'uups'});
    await this.proxy.deployed();
    console.log('Profit_Distributor Proxy Deployed!')

})

it('Upgrades the proxy to point to a newer version of the Profit_Distributor Contract', async function(){
    this.timeout(500000)
    this.upgraded_Profit_Distributor = await hre.upgrades.upgradeProxy(this.proxy, this.Profit_Distributor2)
    await this.upgraded_Profit_Distributor.deployed();
    assert.equal(await this.upgraded_Profit_Distributor.version(), 'v2');
    console.log("Profit_Distributor Upgraded Successfully!")

})

it('deploys the proxy and the upgrade on the same address', async function(){
    assert.equal(this.proxy.address, this.upgraded_Profit_Distributor.address)
    console.log("The Addresses: ");
    console.log("initial Profit_Distributor Address: " + this.proxy.address);
    console.log("Upgrade Profit_Distributor Address: " + this.upgraded_Profit_Distributor.address)
})






