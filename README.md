# Upgradeable SOT NFT (ERC721 Token) & MSOT (ERC20 Token)

## Introduction

This project includes the following:

- [x] Upgradeable contracts - Implemented through UUPS upgradeable proxy pattern (OpenZeppelin Standard)

- [x] SOT NFT (ERC721 Token) - Including the NFT's metadata implementation (both through IPFS and Cloud)

- [x] MSOT (ERC20 Token)

- [x] Scripts for deployment of contracts 

- [x] Scripts for upgradation of contracts

- [x] Script for minting a new token in a deployed instance

- [x] Scripts for uploading NFT's images and metadata files on IPFS

- [x] Unit and Integration Tests

## Project Setup

To get started with this project, follow these steps:
    
1. Clone the repo

2. Run `npm install` in the root of the repo

3. Run `npx hardhat compile` to get all the contracts compiled

4. Run `npx hardhat test` to run all the tests

5. Run `npx hardhat coverage` to know the testing coverage

6. If you wish to use IPFS for NFT metadata and images, add a `.env` file in your root directory and add the following content init:
    ```
    PINATA_API_KEY=""
    PINATA_API_SECRET=""
    PINATA_ENDPOINT="https://api.pinata.cloud/pinning/pinFileToIPFS"
    MNEMONIC="<Your Metamask mnemonic/phrase>"
    ETH_CLIENT_URL="https://rinkeby.infura.io/v3/<Infura-Project-Id>"
    ```
   > **Please Note:**  Login to [Pinata Service](https://app.pinata.cloud/), click profile icon on the right, click on the API keys to know your pinata api key and secret. Sign Up on [Infura](https://infura.io/), create a project and get you project Id from there. Also, keep this .env file private as it contains sensitive data.   
   
    ![Pinata](https://static.slab.com/prod/uploads/7adb25ff/posts/images/J__0NjUkj_6BObi1Q4Q3eRe6.png)

    ![Infura](https://www.trufflesuite.com/img/tutorials/infura/infura-project-details.png)

7. Also, add a `secret.json` file in your root directory, where you'll store your wallet address, key and other sensitive data. The content should be similar to this:

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

   > **Please Note:**  Deployed addresses are required because they are needed in upgradation. This file also needs to be kept private.

8. Run `npx hardhat run scripts/<script-name>.js` to run any of the scripts

9. Run `npx hardhat run scripts/<script-name>.js --network rinkeby` to make transactions like, deployment, upgradation and minting on the testnet. Try running these scripts, but do remember that your testnet urls are stored in secret.json file that we just created, so make sure to use the right url in the rinkeby network configuration in your hardhat.config.json file. If you are **deploying the SOT**, the rinkeby configuration will look like this: 

    ```
    rinkeby: {
        url: secret.SOT_PROJECT_RINKEBY, 
        accounts: [secret.key] 
    }
    ```

    `npx hardhat run scripts/DeploySotProxy.js --network rinkeby`

   It should deploy the contract on the rinkeby testnet and return the address, paste that address in the deployedSotAddress in your secret.json file so that you can upgrade it later on.

    `npx hardhat run scripts/UpgradeSotProxy.js --network rinkeby`

10. Now, to **deploy MSOT**, change your rinkeby configration in hardhat config as follows:

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


