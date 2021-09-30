// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../SOT.sol';

contract SOT2 is SOT{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}