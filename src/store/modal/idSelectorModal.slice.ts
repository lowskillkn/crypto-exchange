import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface INetwork {
  name: string
  id: string
  hex: string
  url: string
  rpcUrl: string[]
}

export interface IdSelectorModalState {
  currentNetwork: INetwork
  networksList: INetwork[]
}

const initialState: IdSelectorModalState = {
  currentNetwork: {
    name: '',
    id: '',
    hex: '',
    url: '',
    rpcUrl: [''],
  },
  networksList: [
    {
      name: 'Ethereum',
      id: '1',
      hex: '0x1',
      url: 'https://app.1inch.io/assets/images/network-logos/ethereum.svg',
      rpcUrl: ['https://mainnet.optimism.io'],
    },
    {
      name: 'Binance Smart Chain',
      id: '56',
      hex: '0x38',
      url: 'https://app.1inch.io/assets/images/network-logos/bsc_2.svg',
      rpcUrl: ['https://bsc-dataseed.binance.org/'],
    },
    {
      name: 'Polygon',
      id: '137',
      hex: '0x89',
      url: 'https://app.1inch.io/assets/images/network-logos/polygon.svg',
      rpcUrl: ['https://rpc-mainnet.maticvigil.com/'],
    },
    {
      name: 'Optimism',
      id: '10',
      hex: '0xA',
      url: 'https://app.1inch.io/assets/images/network-logos/optimism.svg',
      rpcUrl: ['https://mainnet.optimism.io'],
    },
    {
      name: 'Arbitrum',
      id: '42161',
      hex: '0xA4B1',
      url: 'https://app.1inch.io/assets/images/network-logos/arbitrum.svg',
      rpcUrl: ['https://arb1.arbitrum.io/rpc'],
    },
    {
      name: 'Gnosis chain',
      id: '100',
      hex: '0x64',
      url: 'https://app.1inch.io/assets/images/network-logos/gnosis.svg',
      rpcUrl: ['https://rpc.gnosischain.com'],
    },
    {
      name: 'Avalache',
      id: '43114',
      hex: '0xA86A',
      url: 'https://app.1inch.io/assets/images/network-logos/avalanche.svg',
      rpcUrl: ['https://api.avax.network/ext/bc/C/rpc'],
    },
    {
      name: 'Fhantom',
      id: '250',
      hex: '0xFA',
      url: 'https://app.1inch.io/assets/images/network-logos/fantom.svg',
      rpcUrl: ['https://rpc.ftm.tools/'],
    },
    {
      name: 'Klaytn',
      id: '8217',
      hex: '0x2019',
      url: 'https://app.1inch.io/assets/images/network-logos/klaytn.svg',
      rpcUrl: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    },
    {
      name: 'Aurora',
      id: '1313161554',
      hex: '0x4E454152',
      url: 'https://app.1inch.io/assets/images/network-logos/aurora.svg',
      rpcUrl: ['https://mainnet.aurora.dev'],
    },
  ],
}

export const idSelectorModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeCurrentNetwork(state, action: PayloadAction<INetwork>) {
      state.currentNetwork = action.payload
    },
  },
})

export const idSelectorModalActions = idSelectorModalSlice.actions
export const idSelectorModalReducer = idSelectorModalSlice.reducer
