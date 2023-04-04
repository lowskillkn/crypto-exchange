import React, { useEffect, useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { useGetAmountOfTokensSwapQuery } from '../store/tokens/1inch.api'
import { useGetBalanceQuery } from '../store/user/user.api'

interface SelectorProps {
  type: string
}

export default function Selector({ type }: SelectorProps) {
  const token = useAppSelector((state) => {
    if (type === 'sell') {
      return state.tokensReducer.tokenForSell
    }
    return state.tokensReducer.tokenForBuy
  })
  const { showModal, changeQuoteParams } = useActions()
  const { tokenCountForSell, tokenCountForBuy } = useAppSelector(
    (state) => state.tokensReducer
  )

  const { tokenForBuy, tokenForSell, gasPriceData, txSpeed } = useAppSelector(
    (state) => state.tokensReducer
  )
  const { currentNetwork } = useAppSelector(
    (state) => state.idSelectorModalReducer
  )
  const { changeTokenCount } = useActions()
  const { currentAccount } = useAppSelector(
    (state) => state.userMetamaskReducer
  )
  const { isLoading, isError, data } = useGetAmountOfTokensSwapQuery([
    tokenForSell.address,
    tokenForBuy.address,
    (+tokenCountForSell * 1e18).toString(),
    currentNetwork?.id,
    gasPriceData,
    txSpeed,
  ])

  useEffect(() => {
    if (!isLoading && !isError) {
      changeQuoteParams(data)
    }
  }, [data])

  const {
    isLoading: isLoad,
    isError: isErr,
    data: allowancesAndBalances,
  } = useGetBalanceQuery([currentAccount, currentNetwork?.id])

  useEffect(() => {
    if (!isLoading && !isError) {
      const countOfToken = data.toTokenAmount / 10e18
      changeTokenCount({ type: 'buy', count: countOfToken.toString() })
      return
    }
    changeTokenCount({ type: 'buy', count: '0.0' })
  }, [data, tokenCountForBuy])

  return (
    <div className="InputBlock__selector selector">
      <div
        className="selector__token token"
        onClick={() => showModal(type)}
      >
        <div className="token__icon">
          <img
            src={token.logoURI}
            alt=""
          />
        </div>
        <div className="token__name">
          {token.symbol}
          {!isLoad &&
          !isErr &&
          '0' !== allowancesAndBalances[tokenForSell.address]?.allowance ? (
            ''
          ) : type === 'sell' ? (
            <span style={{ fontSize: '1.2rem' }}> locked</span>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="token__count">
        <input
          value={
            type === 'sell'
              ? tokenCountForSell
              : +tokenCountForSell === 0
              ? '0.0'
              : Number(tokenCountForBuy).toFixed(23)
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const count = event.target.value
            changeTokenCount({ type, count })
          }}
          disabled={type === 'sell' ? false : true}
          type="string"
          className="token__input"
        />
      </div>
    </div>
  )
}
