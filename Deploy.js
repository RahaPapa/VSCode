//synchronous [solidity]
//asychronous [javascript]

//cooking

// cooking
// Synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn to finish
// 3. Pour drinks for everyone

// Asynchronous
// 1. Put popcorn in the mircrowave
// 2. Pour drinks for everyone
// 3. Wait for popcorn to finish

// Promise
// Pending
// Fulfilled
// Rejected

//practise below

//Setup Movie Night

//Cook popcorn
//Pour Drinks
//Start Movie

//async function setupMovieNight() {
//  await cookPopcorn();
//await pourDrinks();
//startMovie();}

//function cookPopcorn() {
//some code  here
//return Promise(/*Some Code Here*/);}

//async function main() {
//console.log("hi");
//sama mis uint256 variable = 5
//let variable = 5;
//console.log(variable);
//deploy a contract? Wait for it to be deployed
//contract.deploy ->wouldn't wait for it to finish}

const ethers = require("ethers")
// const solc = require("solc")
const fs = require("fs-extra")
require("dotenv").config()


async function main() {
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  // compile them in our code
  //compile them seperately
  //http://127.0.0.1:7545
  // console.log(process.env.PRIVATE_KEY);
  // const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );

  // wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
      "./SimpleStorage_sol_SimpleStorage.bin",
      "utf8"
  )
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  //STOP here! Wait for contract to deploy!
  // const contract = await contractFactory.deploy({ gasPrice: 100000000000 })
  // const deployment = await contract.deployTransaction.wait(1);
  // console.log('Contract Address: ${contract.address}')
  //console.log(`Contract deployed to ${contract.address}`)
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying, please wait...")
  const contract = await contractFactory.deploy()
  const deploymentReceipt = await contract.deployTransaction.wait(1)
  console.log(`Contract deployed to ${contract.address}`)

  //   console.log("Let's deploy with only transaction data!");
  // const nonce = await wallet.getTransactionCount();
  //   const tx = {
  // nonce = 4,
  // gasPrice: 20000000000,
  // gasLimit: 1000000,
  // to: null,
  // value:
  // data:"",
  // chainid: 5777,
  // }
  // const sentTXResponse = await wallet.sentTransaction(tx);
  // await sentTXResponse.wait(1)
  // console.log(signedTxresponse);
  // }

  //console.log("Here is the deployment transaction: ");
  //console.log(contract.deployTransaction);
  //console.log("Here is the transaction receipt: ");
  //console.log(transactionReceipt);

//   const currentFavoriteNumber = await contract.retrieve();
//   console.log("currentFavoriteNumber: ${currentFavoriteNumber.toString()}");
//   const transactionResponse = await contract.store("7");
//   const transactionRecepit = await transactionResponse.wait(1);
//   const updateFavoriteNumber = await contract.retrieve(1);
//   console.log("Update favorite number is: ${updateFavoriteNumber}");
// }
let currentFavoriteNumber = await contract.retrieve()
console.log(`Current Favorite Number: ${currentFavoriteNumber}`)
console.log("Updating favorite number...")
let transactionResponse = await contract.store(7)
let transactionReceipt = await transactionResponse.wait()
currentFavoriteNumber = await contract.retrieve()
console.log(`New Favorite Number: ${currentFavoriteNumber}`)
}


// console.log(`Current Favorite Number: ${currentFavoriteNumber}`)
//     console.log("Updating favorite number...")
//     let transactionResponse = await contract.store(7)
//     let transactionReceipt = await transactionResponse.wait()
//     currentFavoriteNumber = await contract.retrieve()
//     console.log(`New Favorite Number: ${currentFavoriteNumber}`)
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
  main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error)
      process.exit(1)
  })
