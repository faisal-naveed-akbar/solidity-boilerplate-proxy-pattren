// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Rentor is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    
    function initialize() public initializer{
        __Ownable_init();
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{} 

}



contract Rentor2 is Rentor{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}

