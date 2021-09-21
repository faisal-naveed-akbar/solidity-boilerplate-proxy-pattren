// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Profit_Distributor is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    
    function initialize() public initializer{
        __Ownable_init();
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{} 

}



contract Profit_Distributor2 is Profit_Distributor{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}

