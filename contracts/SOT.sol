// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./libraries/ERC721Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SOT is Initializable, ERC721Upgradeable, UUPSUpgradeable {

    function initialize() public initializer{
        __ERC721_init('Sot', "SOT");
        __Ownable_init();

        for(uint i = 0; i<=1; i++){
            _mint(msg.sender, 0, 0, 0);
        }
        
        
        
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{} 
    
    
}



contract SOT2 is SOT{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}

