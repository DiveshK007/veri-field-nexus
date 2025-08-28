import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [hardhat, sepolia, mainnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: 'verifield-demo', // Demo project ID
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}