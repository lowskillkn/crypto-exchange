import React, { useEffect, useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { useGetBalanceQuery } from '../store/user/user.api'

interface IInfo {
  type: string
  hasButton: boolean
}

export default function Info({ type, hasButton }: IInfo) {
  const { currentAccount } = useAppSelector(
    (state) => state.userMetamaskReducer
  )
  const { tokenForSell, quoteParams, gasPriceData, txSpeed } = useAppSelector(
    (state) => state.tokensReducer
  )
  const { currentNetwork } = useAppSelector(
    (state) => state.idSelectorModalReducer
  )
  const { balance } = useAppSelector((state) => state.userMetamaskReducer)
  const { isLoading, isError, data } = useGetBalanceQuery([
    currentAccount,
    currentNetwork?.id,
  ])
  const { changeTokenCount, changeBalance } = useActions()

  useEffect(() => {
    if (!isLoading && !isError) {
      changeBalance((data[tokenForSell.address]?.balance / 1e18).toString())
      return
    }
  }, [data, tokenForSell])

  const sellAllTokens = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    changeTokenCount({
      type: 'sell',
      count: +balance - 0.05,
    })
  }

  return (
    <div className="InputBlock__info info">
      <a
        href=""
        className="info__link link"
      >
        {type === 'sell' ? 'You sell' : 'You buy'}
      </a>
      <div className="info__balance balance">
        {type === 'sell' && (
          <div className="balance__text">
            Balance:{' '}
            {type === 'sell' && !isLoading && !isError && data !== 'undefind'
              ? (data[tokenForSell.address]?.balance / 1e18).toFixed(3)
              : '0'}
          </div>
        )}
        {hasButton && (
          <span
            className="balance__button btn"
            onClick={sellAllTokens}
          >
            MAX
          </span>
        )}
      </div>
    </div>
  )
}
