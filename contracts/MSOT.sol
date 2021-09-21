// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MSOT is Initializable, ERC721Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    
    function initialize() public initializer{
        __ERC721_init('Msot', "MSOT");
        __Ownable_init();
        //_mint(msg.sender, 10000000 * 10 * decimals());
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{} 

}



contract MSOT2 is MSOT{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}

