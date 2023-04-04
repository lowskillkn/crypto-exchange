import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const inchApi = createApi({
  reducerPath: 'inch/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.1inch.io/v5.0/',
  }),
  endpoints: (build) => ({
    getAmountOfTokensSwap: build.query<any, string[]>({
      query: ([
        fromTokenAddress,
        toTokenAddress,
        amount,
        id,
        gasPriceData,
        txSpeed,
      ]: any[]) => ({
        url: `${id}/quote`,
        params: {
          fromTokenAddress,
          toTokenAddress,
          amount: amount,
          gasPriceData:
            txSpeed === 'Fast'
              ? gasPriceData.fast
              : txSpeed === 'Instant'
              ? gasPriceData.instant
              : gasPriceData.standard,
          preset: 'maxReturnResult',
        },
      }),
    }),
  }),
})

export const { useGetAmountOfTokensSwapQuery } = inchApi
