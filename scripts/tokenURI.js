require("dotenv").config()
let secret = require('../secret')

const API_URL = process.env.API_URL
const PRIVATE_KEY = secret.key;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

// const web3 = createAlchemyWeb3(API_URL)
const Web3 = require("web3");
const ethNetwork = secret.MSOT_PROJECT_RINKEBY;

try {
        const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
        console.log("Connection Successfull!");
        console.log("Latest Block Number: ");
        web3.eth.getBlockNumber().then(console.log);

        const contract = require("../artifacts/contracts/SOT.sol/SOT.json")
        console.log(JSON.stringify(contract.abi))

        const contractAddress = secret.deployedSotAddress;
        const walletAddress = secret.wallet_address;

        const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

        mintNFT();
        //nftContract.methods._mint("0x6357Da64e3Bbdc59fe0e3CAaf7B02b4FBac31d6A", 0,0,0);

    async function mintNFT() {

        const nonce = await web3.eth.getTransactionCount(walletAddress, "latest") 
    
        const tx = {

            from: walletAddress,
        
            to: contractAddress,
        
            nonce: nonce,
        
            gas: 500000,
        
            data: nftContract.methods.tokenURI(0).encodeABI(),
        
          }

          console.log(nftContract.methods.tokenURI(0))
          const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

          signPromise
        
            .then((signedTx) => {
        
              web3.eth.sendSignedTransaction(
        
                signedTx.rawTransaction,
        
                function (err, hash) {
        
                  if (!err) {
        
                    console.log(
        
                      "The hash of your transaction is: ",
        
                      hash,
        
                      "\nCheck Alchemy's Mempool to view the status of your transaction!"
        
                    )
        
                  } else {
        
                    console.log(
        
                      "Something went wrong when submitting your transaction:",
        
                      err
        
                    )
        
                  }
        
                }
        
              )
        
            })
        
            .catch((err) => {
        
              console.log(" Promise failed:", err)
        
            })
        }
                
}
catch(e) {
        console.log("Connection Error!", e);
}




