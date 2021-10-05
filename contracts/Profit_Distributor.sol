// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

contract Profit_Distributor is Initializable{

    address public txFeeToken;
    address public platform;
    IERC20Upgradeable token; 


    function _distributeTxFee(address seller, address buyer, uint256 txFee, address originalOwner) internal {
         
         uint256 royalty = (txFee * 25) / 1000;
         uint256 fees = txFee - (2 * royalty);

        _payFees(seller, buyer , fees);
        _payRoyaltyToPlatform(seller, royalty);
        _payRoyaltyToOriginalOwner(seller, originalOwner, royalty);

    }

    function _payFees(address seller, address buyer, uint256 amount) internal{
        
        //pay fees to the SOT seller
        token.transferFrom(buyer, seller , amount);
    }

    function _payRoyaltyToPlatform(address seller, uint256 amount) internal {

        //pay royalty to the platform
        token.transferFrom(seller, platform , amount);
    }

    function _payRoyaltyToOriginalOwner(address seller, address originalOwner, uint256 amount) internal {

        //pay royalty to original owner
        token.transferFrom(seller, originalOwner , amount);

    }

    

}

