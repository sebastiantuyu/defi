pragma solidity ^0.5.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {

    string public name = "Dapp Token Farm";   
    address owner;
    DappToken public dappToken;
    DaiToken public daiToken;
    //Array with all the people who ever stake
    address[] public stakers;


    // Mapping is a datastrcutre 
    // give KEY and return ==> VALUE
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    //1. Stake Tokens
    function stakeTokens(uint _amount) public {

        // avoid 0 staking
        require(_amount > 0, "Amount should be grater than 0"); 

        // keyword THIS correspond to this SC itslef
        // transfer from is for delegate the transfer
        daiToken.transferFrom(msg.sender, address(this),_amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // add to the list only if  the have stake mDai
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        // actualiza el estado del hasstake del user que hizo stake
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }


    //2. Unstake tokens
    function unStakeTokens() public {
        uint balance = stakingBalance[msg.sender];

        require(balance>0,"Stake more than 0");
        //Transder dai tokens back to the owner
        daiToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;
        
        isStaking[msg.sender] = false;

    }





    //3. Issuing tokens
    function issueTokens() public {

        require(msg.sender == owner, "Only the owner can call to issue tokens");
        for(uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if( balance >0 ){
                dappToken.transfer(recipient, balance);
            }
        }
    }
}

