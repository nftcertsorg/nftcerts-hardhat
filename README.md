# NFTCert Hardhat

Repository containing the smart contract code for NFT Cert

#### **Install & Run**

install packages: `npm i`
setup env file: create a .env file from .env.config, add your ethereum private key to .env

#### **Mumbai Deployed**

most recent: 0x9B1a1565BE7041FF1bC1935CBba8d7b790434a65

0xdd92A92895A432c0B1401773484293C8B201cC24

#### **Hardhat commands**
run test: `npx hardhat test test/nftcert-test.js`

deploy-local: `npx hardhat run --network localhost scripts/deploy-nftcerts.js`<br>
deploy-mumbai: `npx hardhat run --network mumbai scripts/deploy-nftcerts.js`

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
