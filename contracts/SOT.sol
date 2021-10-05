// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "./Profit_Distributor.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract SOT is ERC721Upgradeable, UUPSUpgradeable, OwnableUpgradeable, Profit_Distributor {

    uint256 private _currentTokenId;
    uint256 private _currentSupply;
    uint public txFeeAmount;
    address public originalOwner;

    //No constructor in upgradeable contracts, replaced by initilize() function
    function initialize() public initializer{
        
        __ERC721_init('Sot', "SOT");
        __Ownable_init();

        //setting the original owner
        originalOwner = _msgSender();

        //Minting 5 tokens initially
        for(uint i = 0; i<5; i++){
            mint(msg.sender);
        }
        
    }

    //Function to convert an integer into string
    function uint2str(uint _i) public pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    //Modifier to check if the token against a tokenId exists or not
    modifier tokenExists(uint256 tokenId){
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        _;
    }

    //Modifier to check that the minting limit is not reached
    modifier withinMintingLimit(){
        require(_currentSupply < 1200000, "Minting limit reached!");
        _;
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{} 

    
    //overriding the default implementation of tokenURI in ERC721Upgradeable
    function tokenURI(uint256 tokenId) public view virtual override tokenExists(tokenId) returns (string memory) {
        
        string memory baseURI = _baseURI();

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, uint2str(tokenId), ".json")) : "";

    }

    //overriding the default implementation of baseURI in ERC721Upgradeable
    function _baseURI() internal view virtual override returns (string memory) {
        return string(abi.encodePacked("https://res.cloudinary.com/dhxeeeqc8/raw/upload/v1632816504/SOTs/Metadata/"));
    }

    function mint(address to) public virtual onlyOwner withinMintingLimit {
        
        _mint(to, _currentTokenId);
        
        _currentTokenId += 1;
        _currentSupply += 1;
    }

    function burn(uint256 tokenId) public virtual onlyOwner {
    
        _burn(tokenId);
        _currentSupply -= 1;

    }

    //use this funciton to sell the NFTs, rather than the default transferFrom function of the NFT
    function sellMyNFT(
        address seller,
        address buyer, 
        uint256 tokenId,
        uint256 txFee,//total fee including the royalty for the platform and the original owner
        address erc20Token,//The address of the deployed MSOT, the ERC20 token, in which the buyer will pay
        address platformOwner//The wallet address of the platform owner, so that royalties can be transferred to this account
    ) public {

        txFeeToken = erc20Token;
        platform = platformOwner;
        token = IERC20Upgradeable(txFeeToken); 
        txFeeAmount = txFee;

        transferFrom(seller, buyer, tokenId);
    }

    function transferFrom(
        address seller, 
        address buyer, 
        uint256 tokenId
    ) public override {
        require(
        _isApprovedOrOwner(_msgSender(), tokenId), 
        'ERC721: transfer caller is not owner nor approved'
        );

        //if transferFrom is called directly, without calling sellMyNFT, like OpenSea does, no profit distribution will work, it has to be managed on OpenSea itself
        if(txFeeToken != address(0) && platform != address(0)){
            _distributeTxFee(seller, buyer, txFeeAmount, originalOwner);
        }
        _transfer(seller, buyer, tokenId);
    }

    function getCurrentTokenId() public view returns (uint256 id){
        return _currentTokenId;
    }

    function getTotalSupply() public view returns (uint256 id){
        return _currentSupply;
    }

    

}

