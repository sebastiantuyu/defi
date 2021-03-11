const { assert } = require('chai');
const { default: Web3 } = require('web3');

const DappToken = artifacts.require('DappToken');
const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');


require('chai')
    .use(require('chai-as-promised'))
    .should()

// function for convert ETH ====> Wei
function token(n){
    return Web3.utils.toWei(n,'ether')
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
    })

    describe('Mock Dai deployment', async () =>{
        it('has a name', async () => {
            let daiToken = await DaiToken.new()
            let name = await daiToken.name()
            assert.equal(name,'Mock DAI Token')
        })
    })
}) 