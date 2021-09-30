// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Profit_Distributor.sol";

contract Profit_Distributor2 is Profit_Distributor{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}

