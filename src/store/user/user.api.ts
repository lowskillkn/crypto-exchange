import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://balances.1inch.io/v1.1/',
  }),
  endpoints: (build) => ({
    getBalance: build.query<any, string[]>({
      query: ([accountAddress, id]: string[]) => ({
        url: `${id}/allowancesAndBalances/0x1111111254eeb25477b68fb85ed929f73a960582/${accountAddress}`,
        params: {
          tokensFetchType: 'listedTokens',
        },
      }),
    }),
    getBalanceFhantom: build.query<any, string[]>({
      query: ([accountAddress, id]: string[]) => ({
        url: `${id}/allowancesAndBalances/0x1111111254eeb25477b68fb85ed929f73a960582/${accountAddress}`,
        params: {
          tokensFetchType: 'listedTokens',
        },
      }),
    }),
  }),
})

export const { useGetBalanceQuery } = userApi