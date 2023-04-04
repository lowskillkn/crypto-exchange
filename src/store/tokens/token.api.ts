import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IGetTokenProps {
  walletAddress: string
  fromTokenAddress: string
  toTokenAddress: string
  amount: string
  enableEstimate?: boolean
}

// export const tokenApi = createApi({
//   reducerPath: 'token/api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://fusion.1inch.io/quoter/v1.0/137',
//   }),
//   endpoints: (build) => ({
//     getTokenPrice: build.query<string, IGetTokenProps>({
//       query: (props: IGetTokenProps) => ({
//         url: `/quote/receive`,
//         params: {
//           walletAddress: props.walletAddress,
//           fromTokenAddress: props.fromTokenAddress,
//           toTokenAddress: props.toTokenAddress,
//           amount: props.amount,
//           enableEstimate: props.enableEstimate = false
//         }
//       })),
//   }),
// }})

export const tokenApi = createApi({
  reducerPath: 'token/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.1inch.io/v5.0/',
  }),
  endpoints: (build) => ({
    getTokenPrice: build.query<any, string>({
      query: (id: string) => ({
        url: `${id}/tokens`,
      }),
    }),
  }),
})

export const {} = tokenApi
