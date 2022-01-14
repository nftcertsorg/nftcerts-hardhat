const { expect } = require("chai");
const { ethers } = require("hardhat");

let owner, tx, nftCerts
const accounts = []

describe("NFTCert", function () {
  before(async () => {
    const signers = await ethers.getSigners()
    for (let i = 0; i < 10; i++) {
      accounts.push(signers[i])
    }
    owner = accounts[0]
  })
  describe("Minting", async () => {
    before(async () => {
      const NFTCerts = await ethers.getContractFactory("NFTCerts")
      nftCerts = await NFTCerts.deploy()
      await nftCerts.deployed()
    })

    it("should mint a token", async () => {
      tx = await nftCerts.safeMint(accounts[0].address, 'https://nftcerts.com/id')
      await tx.wait()

      tx = await nftCerts.getTokenIds(accounts[0].address)
      tx.forEach(async tid => {
        expect(tid.toString()).to.equal('0')
      })
    })
  })
});
