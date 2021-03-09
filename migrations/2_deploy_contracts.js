const DappToken = artifact.require('DappToken');
const DaiToken = artifact.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

module.exports = async function(deployer) {
    
    await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed();

    await deployer.deploy(DaiToken);
    const daiToken = await DaiToken.deployed();
    
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
    const tokenFarm = await TokenFarm.deployed();

    await dappToken.transfer(tokenFarm.address,'1000000000000000000000000');

    await daiToken.transfer(accounts[0],'1000000000000000000000000');
};
