pragma solidity ^0.5.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {

    string public name = "Dapp Token Farm";   
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
    }

    //1. Stake Tokens
    function stakeTokens(uint _amount) public {

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

    //3. Issuing tokens
}

