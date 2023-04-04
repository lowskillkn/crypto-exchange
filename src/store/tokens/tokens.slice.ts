import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IToken } from '../../models/IToken'

interface TokensState {
  tokenForSell: IToken
  tokenForBuy: IToken
  tokenCountForSell: string
  tokenCountForBuy: string
  tokensList: IToken[]
  txSpeed: string
  gasPriceData: any
  quoteParams?: any
}

export interface ChangeTokenCountProps {
  type: string
  count: string
}

const initialState: TokensState = {
  tokenForSell: {
    symbol: 'FTM',
    name: 'Fantom Token',
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    logoURI:
      'https://tokens.1inch.io/0x4e15361fd6b4bb609fa63c81a2be19d873717870.png',
    tags: ['native'],
  },
  tokenForBuy: {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    logoURI:
      'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png',
    tags: ['tokens', 'PEG:USD'],
  },
  tokenCountForSell: '0.0',
  tokenCountForBuy: '0.0',
  tokensList: [],
  txSpeed: 'Standart',
  gasPriceData: {
    fast: '0.0',
    instant: '0.0',
    standard: '0.0',
  },
  quoteParams: {
    estimatedGas: '0',
  },
}

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    swapTokens(state) {
      const tokenForBuyUpdated = state.tokenForBuy
      const tokenCountForBuyUpadated = state.tokenCountForBuy
      state.tokenForBuy = state.tokenForSell
      state.tokenForSell = tokenForBuyUpdated
      state.tokenCountForBuy = state.tokenCountForSell
      state.tokenCountForSell = tokenCountForBuyUpadated
    },
    changeTokenCount(state, action: PayloadAction<any>) {
      if (action.payload.type === 'sell') {
        state.tokenCountForSell = action.payload.count
        return
      }
      state.tokenCountForBuy = action.payload.count
    },
    changeToken(
      state,
      action: PayloadAction<{ token: IToken; typeOfModal: string }>
    ) {
      if (action.payload.typeOfModal === 'sell') {
        state.tokenForSell = action.payload.token
        return
      }
      state.tokenForBuy = action.payload.token
    },
    addTokens(state, action: PayloadAction<IToken[]>) {
      state.tokensList = action.payload
      state.tokenForSell = action.payload[0]
      state.tokenForBuy = action.payload[1]
    },
    changeQuoteParams(state, action: PayloadAction<any>) {
      state.quoteParams = action.payload
    },
    changeGasPriceData(state, action: PayloadAction<any>) {
      state.gasPriceData = action.payload
    },
    changeTxSpeed(state, action: PayloadAction<string>) {
      state.txSpeed = action.payload
    },
  },
})

export const tokensActions = tokensSlice.actions
export const tokensReducer = tokensSlice.reducer
