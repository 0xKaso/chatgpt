import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'

import { useState } from 'react'

export function Hero() {
  const [amount, setAmount] = useState(0)

  function Controller(params) {
    return (
      <div>
        <button
          onClick={() => setAmount((v) => (v - 1 < 0 ? 0 : v - 1))}
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
        {amount * 0.02}ETH &nbsp;&nbsp;
        <button
          onClick={()=>{console.log("mint")}}
          className="hover:bg-grey inline-flex justify-center rounded-2xl bg-black p-2 text-base font-semibold text-white focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500 active:text-white/70"
        >
          🤖️ Mint 🤖️
        </button>
      </div>
    )
  }

  return (
    <div className="relative pt-10 pb-20 sm:py-24">
      <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden">
        <Image
          className="absolute top-0 left-0 translate-y-[-10%] translate-x-[-55%] -scale-x-100 sm:left-1/2 sm:translate-y-[-6%] sm:translate-x-[-98%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          // src={backgroundImage}
          alt=""
          width={918}
          height={1495}
          priority
          unoptimized
        />
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
              ['Mint Price', '0.02ETH'],
              ['Mint Time', '2023/11/09 18:00'],
              ['Quantity', Controller()],
              ['Mint Cost', Mint()],
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
