const { assert } = require('chai');
const { default: Web3 } = require('web3');

const DappToken = artifacts.require('DappToken');
const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

// accounts 
// 0 --> Deployer
// 1 --> Investor


require('chai')
    .use(require('chai-as-promised'))
    .should()

// function for convert ETH ====> Wei
function token(n){
    return web3.utils.toWei(n,'ether')
}

contract('TokenFarm', accounts => {
    let daiToken, dappToken, tokenFarm
    //Write a before
    before(async () =>{
        // Load each one of the contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address,daiToken.address)

        // Transfer tokens into farm
        await dappToken.transfer(tokenFarm.address,token('1000000'))

        //Return tokens to investor, from account of deployer
        await daiToken.transfer(accounts[1],token('100'),{from:accounts[0]})
    })

    describe('Mock Dai deployment', async () =>{
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name,'Mock DAI Token')
        })
    })

    describe('Dapp Token deployment', async () =>{
        it('has a name', async () => {
            const name = await dappToken.name()
            assert.equal(name,'DApp Token')
        })
    })

    describe('Token Farm deployment', async () =>{
        it('has a name', async () => {
            const name = await tokenFarm.name()
            assert.equal(name,'Dapp Token Farm')
        })

        it('contract has tokens',async () => {
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(),token('1000000'))
        })
    })
    






}) 