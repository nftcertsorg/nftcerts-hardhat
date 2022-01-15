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
      const metadataBytes32 = ethers.utils.formatBytes32String('some kinda hash')
      const hashedMetadata = ethers.utils.sha256(metadataBytes32)
      const uri = 'https://nftcerts.com/id'
      tx = await nftCerts.mint(accounts[0].address, uri, hashedMetadata)
      await tx.wait()

      tx = await nftCerts.getTokenIds(accounts[0].address)
      tx.forEach(async tid => {
        expect(tid.toString()).to.equal('0')
      })

      tx = await nftCerts.getTokenMetadataHash(0)
      expect(hashedMetadata).to.equal(tx)

      tx = await nftCerts.tokenURI(0)
      expect(uri).to.equal(tx)
    })
  })
});
