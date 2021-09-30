# Upgradeable SOT NFT (ERC721 Token) & MSOT (ERC20 Token)

## Introduction

This project includes the following:

    1. Upgradeable contracts - Implemented through UUPS upgradeable proxy pattern (OpenZeppelin Standard)
    2. SOT NFT (ERC721 Token) - Including the NFT's metadata implementation (both through IPFS and Cloud)
    3. MSOT (ERC20 Token)
    4. Scripts for deployment of contracts 
    5. Scripts for upgradation of contracts
    6. Script for minting a new token in a deployed instance
    7. Scripts for uploading NFT's images and metadata files on IPFS
    8. Unit and Integration Tests

## Project Setup

To get started with this project, follow these steps:
    
    1. Clone the repo

    2. Run `npm install` in the root of the repo

    3. Run `npx hardhat compile` to get all the contracts compiled

    4. Run `npx hardhat test` to run all the tests

    5. Run `npx hardhat coverage` to know the testing coverage

    6. If you wish to use IPFS for NFT metadata and images, add a **.env** file in your root directory and add the following content init:

        ```
        PINATA_API_KEY=""
        PINATA_API_SECRET=""
        PINATA_ENDPOINT="https://api.pinata.cloud/pinning/pinFileToIPFS"
        MNEMONIC="<Your Metamask mnemonic/phrase>"
        ETH_CLIENT_URL="https://rinkeby.infura.io/v3/<Infura-Project-Id>"
        ```

        `Please Note: ` Login to pinata service, click profile icon on the right, click on the API keys to    know your pinata api key and secret. Keep this file private as it contains sensitive data.    

    7. Also, add a secret.json file in your root directory, where you'll store your wallet address, key and other sensitive data. The content should be similar to this:

        ```   
        {
            "key": "<Key to your metamask wallet account>",
            "urlRopsten": "https://speedy-nodes-nyc.moralis.io/<Project-Id>/eth/ropsten",
            "SOT_PROJECT_RINKEBY": "https://rinkeby.infura.io/v3/<SOT-Project-Id>",
            "MSOT_PROJECT_RINKEBY": "https://rinkeby.infura.io/v3/<MSOT-Project-Id>",
            "wallet_address": "<Your metamask account address>",
            "deployedSotAddress": "<Once you deploy SOT, it will return an address, paste that here>",
            "deployedMsotAddress": "<Once you deploy MSOT, it will return an address, paste that here>"
        }
        ```

        `Please Note: ` Deployed addresses are required because they are needed in upgradation. This file also needs to be kept private.

    8. Run `npx hardhat run scripts/<script-name>.js` to run any of the scripts

    9. Run **npx hardhat run scripts/<script-name>.js --network rinkeby** to make transactions like, deployment, upgradation and minting on the testnet. Try running these scripts, but do remember that your testnet urls are stored in secret.json file that we just created, so make sure to use the right url in the rinkeby network configuration in your hardhat.config.json file. If you are deploying the SOT, the rinkeby configuration will look like this: 

        ```
        rinkeby: {
            url: secret.SOT_PROJECT_RINKEBY, 
            accounts: [secret.key] 
        }
        ```

        `npx hardhat run scripts/DeploySotProxy.js --network rinkeby`

        It should deploy the contract on the rinkeby testnet and return the address, paste that address in the deployedSotAddress in your secret.json file so that you can upgrade it later on.

        `npx hardhat run scripts/UpgradeSotProxy.js --network rinkeby`
        
        Now, to deploy MSOT, change your rinkeby configration in hardhat config as follows:

        ```
        rinkeby: {
            url: secret.MSOT_PROJECT_RINKEBY, 
            accounts: [secret.key] 
        }
        ```

        `npx hardhat run scripts/DeployMsotProxy.js --network rinkeby`

        It should deploy the contract on the rinkeby testnet and return the address, paste that address in the deployedMsotAddress in your secret.json file so that you can upgrade it later on.

        `npx hardhat run scripts/UpgradeMsotProxy.js --network rinkeby`

## Adding Metadata


