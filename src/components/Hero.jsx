import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

import { useState } from 'react'

import { ethers } from 'ethers'

// import {parseEther} from "ethers/utils"

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { address, abi } from './contract/main'

export function Hero() {
  const [amount, setAmount] = useState(1)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'mintGuest',
    args: [parseInt(amount)],
    enabled: Boolean(amount),
    chainId: 5,
    overrides: {
      value: ethers.utils.parseEther('0.02').mul(amount),
    },
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  function Controller() {
    return (
      <div>
        <button
          onClick={() => setAmount((v) => (v - 1 < 1 ? 1 : v - 1))}
          className="hover:bg-grey inline-flex justify-center rounded-2xl bg-black p-2 text-base font-semibold text-white focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500 active:text-white/70"
        >
          -
        </button>
        &nbsp; {amount} &nbsp;
        <button
          onClick={() => {
            setAmount((v) => (v + 1 > 5 ? 5 : v + 1))
          }}
          className="hover:bg-grey inline-flex justify-center rounded-2xl bg-black p-2 text-base font-semibold text-white focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500 active:text-white/70"
        >
          +
        </button>
      </div>
    )
  }

  function Mint(params) {
    return (
      <div>
        {amount * 0.009} ETH &nbsp;&nbsp;
        <button
          disabled={!write}
          onClick={() => {
            console.log('Writing')
            write?.()
          }}
          className="hover:bg-grey inline-flex justify-center rounded-2xl bg-black p-2 text-base font-semibold text-white focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500 active:text-white/70"
        >
          🤖️ {isLoading ? 'Minting...' : 'Mint'} 🤖️
        </button>
        <div className="text-sm text-red-600">
          {(isPrepareError || isError) && (
            <div>
              Error: &nbsp;
              {/* {(prepareError || error)?.message} */}
              Captured by aliens...
            </div>
          )}
          {isSuccess && (
            <div className="text-sm text-green-600">
              Successfully minted your NFT!
              <div>
                <a
                  className="underline"
                  href={`https://goerli.etherscan.io/tx/${data?.hash}`}
                >
                  Tranciations on Etherscan
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative pt-10 pb-20 sm:py-24">
      <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="text-black-600 pixelfont font-display text-5xl font-bold tracking-tighter sm:text-7xl">
            THE NFT OF CHATFI
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight ">
            <p>
              ChatFi is a story about creativity, technology, value and
              productivity reform based on ChatGPT. In a not-too-distant future,
              with the development of AI, Web3 and surrounding technologies, the
              boundary between artificial intelligence and intelligence is
              constantly blurring
            </p>
            <p>
              The straightforward content-based industry is being changed,
              whether it is customer service with simple responses, mechanical
              painters, news editors or programmers are all reborn in the wave
              of technology.
            </p>
          </div>
          <Button href="#" className="mt-10 w-full sm:hidden">
            Get your tickets
          </Button>
          <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['Mint Price', '0.009 ETH'],
              ['Mint Time', '2023/02/19 20:00(SGT)'],
              ['Quantity', Controller()],
              // ['Mint Cost', Mint()],
              ["Mint","Coming Soon"]
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="text-black-600 font-mono text-sm">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight ">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}
