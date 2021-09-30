// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Rentor.sol";

contract Rentor2 is Rentor{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}

