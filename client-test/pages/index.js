import { useEffect, useState } from 'react'
import { ethers, providers } from 'ethers'
import Moralis from 'moralis'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useAccount } from 'wagmi'
import * as sigUtil from '@metamask/eth-sig-util'
import * as ethUtil from 'ethereumjs-util'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const requestPublicKey = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const pk = provider.send('eth_getEncryptionPublicKey', [address])
  console.log(pk)
}

const encrypt = (publicKey, text) => {
  const result = sigUtil.encrypt({
    publicKey,
    data: text,
    version: 'x25519-xsalsa20-poly1305'
  })

  return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), 'utf-8'))
}

const decrypt = async (account, text) => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const res = await provider.send('eth_decrypt', [text, account])
  return result
}

const hashData = (data) => {
  const dataToBytes32 = ethers.utils.formatBytes32String(data)
  console.log(ethers.utils.sha256(dataToBytes32))
}

const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )

  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()
  let userAddress = await signer.getAddress()
  console.log(userAddress)
  let balance = await provider.getBalance(userAddress)
  console.log(balance)
  // let mySig = await signer.signMessage('Signed NFTAuth')
  // console.log(mySig)
  return { userAddr: userAddress, userBalance: balance }
}

const checkMetamaskConnected = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const accounts = await provider.listAccounts()
  return accounts.length > 0
}

const getPublicKey = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = provider.getSigner()
  const addr = await signer.getAddress()
  const hash = await ethers.utils.keccak256(addr)
  const signedMessage = await signer.signMessage('signed message')
  const publicKey = ethers.utils.recoverPublicKey(hash, signedMessage)
  const recoveredAddress = ethers.utils.computeAddress(ethers.utils.arrayify(pk))
  console.log(publicKey)
  if (addr != recoveredAddress) {
    console.error('Something went wrong, the recovered address does not match the retrieved address')
  }
}

const initMoralis = async () => {
  const serverUrl = 'https://weooylvieyk7.usemoralis.com:2053/server'
  const appId = 'o395vlfKiJ6dP4QkNuhhVVf5wkO8dS3B6ylwcqzV'
}

const handleFileChange = e => {
  const fileReader = new FileReader()
  fileReader.readAsText(e.target.files[0], 'utf-8')
  fileReader.onload = e => {
    console.log('e.target.result', e.target.result)
    setFiles(e.target.result)
  }
}

export default function Home() {
  const [{data, error, loading}, disconnect] = useAccount({fetchEns: true})
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState('')
  const [files, setFiles] = useState('')

  useEffect(() => {
    hashData('some kinda data')

    checkMetamaskConnected().then(res => {
      console.log(res)
      res ? setConnected(true) : setConnected(false)
    }).catch(err => {
      console.error(error)
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {connected ?
          <>
            <div>wallet connected</div>
            <button onClick={() => getPublicKey()}>sign</button>
          </>
        :
          <button onClick={() => connectWallet()}>Connect</button>
        }
      </div>

      <div>
        <h1>Upload JSON File</h1>
        <input type='file' onChange={handleFileChange} />
      </div>
    </div>
  )
}
