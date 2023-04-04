import React, { useEffect, useState, useRef } from 'react'
import { useActions } from '../hooks/actions'
import InputBlock from './InputBlock'
import { useAppSelector } from '../hooks/redux'
import axios from 'axios'
import { useGetBalanceQuery } from '../store/user/user.api'
import { roundBigNumber, stringToInt } from '../utils/roundBigNumber'
import { getTokensList } from '../utils/getTokensList'
import TxPriceBtn from './txPriceBtn'

export default function SwapBody() {
  const btns = [
    { type: 'Standard', className: 'btn gas-btn btn_red' },
    { type: 'Fast', className: 'btn gas-btn btn_yellow' },
    { type: 'Instant', className: 'btn gas-btn btn_green' },
  ]
  const {
    swapTokens,
    changeAccountAddress,
    changeBalance,
    changeToken,
    addTokens,
    changeGasPriceData,
    changeTxSpeed,
  } = useActions()
  const [needConnection, setNeedConnection] = useState(true)

  const {
    tokenForSell,
    tokenForBuy,
    tokenCountForSell,
    tokenCountForBuy,
    gasPriceData,
    txSpeed,
    quoteParams,
  } = useAppSelector((state) => state.tokensReducer)
  const { currentAccount, balance } = useAppSelector(
    (state) => state.userMetamaskReducer
  )

  const { currentNetwork } = useAppSelector(
    (state) => state.idSelectorModalReducer
  )
  const { isLoading, isError, data } = useGetBalanceQuery([
    currentAccount,
    currentNetwork?.id,
  ])
  const [hasMeta, setHasMeta] = useState(false)

  const addTokensToStore = async () => {
    const tokensList = await getTokensList('250')
    addTokens(Object.values(tokensList))
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMeta(true)
    } else {
      setHasMeta(false)
    }
  }, [])

  useEffect(() => {
    let socket = new WebSocket('wss://gas-price-api.1inch.io/ws')
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (message.event === `updateGasPriceChain${currentNetwork.id}`) {
        console.log(message.result)

        changeGasPriceData(message.result)
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    addTokensToStore()
  }, [currentNetwork])

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        window.ethereum.on('chainChanged', () => {
          localStorage.setItem('chainId', currentNetwork?.id)
        })
      } catch {
        console.log('error')
      }
    }
  }, [])

  useEffect(() => {
    if (typeof currentAccount !== 'undefined' && currentAccount.length > 0) {
      setNeedConnection(false)
      changeAccountAddress(currentAccount)
      return
    }
    setNeedConnection(true)
  }, [currentAccount])

  useEffect(() => {
    updateCurrentAccount()
  }, [])

  const updateCurrentAccount = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const response = (await window.ethereum.request({
          method: 'eth_accounts',
        })) as string[]

        changeAccountAddress(response[0])
      } catch (e) {
        throw new Error('Error')
      }
    }
  }

  const approveToken = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const response = await axios.get(
      `https://api.1inch.io/v5.0/${currentNetwork?.id}/approve/transaction?`,
      {
        params: {
          tokenAddress: tokenForSell.address,
        },
      }
    )

    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: window.ethereum.selectedAddress,
          to: response.data.to,
          data: response.data.data,
        },
      ],
    })
  }

  const connectWallet = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (currentAccount) return

    if (typeof window.ethereum !== 'undefined') {
      try {
        const response = (await window.ethereum.request({
          method: 'eth_requestAccounts',
        })) as string[]

        changeAccountAddress(response[0])
      } catch (e) {
        throw new Error('Error')
      }
    }
  }

  const changeTaxCost = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    event.preventDefault()
    changeTxSpeed(type)
  }

  const tokenSwapHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    const gasPrice =
      txSpeed === 'Instant'
        ? gasPriceData.instant
        : txSpeed === 'Fast'
        ? gasPriceData.fast
        : gasPriceData.standard

    console.log(quoteParams)

    const res = await axios.get<{ tx: any }>(
      `https://api.1inch.io/v5.0/${currentNetwork?.id}/swap`,
      {
        params: {
          fromTokenAddress: tokenForSell.address,
          toTokenAddress: tokenForBuy.address,
          // amount: stringToInt(tokenCountForSell, tokenForSell.decimals),
          amount:
            quoteParams.fromTokenAmount -
            quoteParams.estimatedGas * 1.25 * gasPrice,
          fromAddress: currentAccount,
          gasPrice,
          slippage: 10,
        },
      }
    )
    const data_swap = res.data.tx

    const transactionParameters = {
      nonce: '0x00',
      gasPrice: '0X' + data_swap.gasPrice.toString(16),
      gas: '0x' + data_swap.gas.toString(16),
      to: data_swap.to,
      from: data_swap.from,
      value:
        '0x' +
        (
          +quoteParams.fromTokenAmount -
          data_swap.gasPrice * data_swap.gas * 1.25
        ).toString(16),

      // value: roundBigNumber(tokenCountForSell, tokenForSell.decimals),
      data: data_swap.data,
      chainId: currentNetwork?.hex,
    }

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
  }

  return (
    <form className="SwapBody">
      <InputBlock type="sell" />
      <div className="swapper">
        <div
          className="swapper-arrows"
          onClick={() => {
            swapTokens()
          }}
        >
          &uarr;&darr;
        </div>
      </div>
      <InputBlock type="buy" />

      <div className="tx-info">
        <div className="flex-50 text-left">
          Tx cost <b>{txSpeed}</b>:{' '}
        </div>
        <div className="flex-50 text-right">
          {((txSpeed === 'Instant'
            ? +gasPriceData.instant
            : txSpeed === 'Fast'
            ? +gasPriceData.fast
            : +gasPriceData.standard) *
            quoteParams.estimatedGas) /
            1e18}
        </div>
      </div>

      <div className="btn-container">
        {!needConnection ? (
          !isLoading &&
          !isError &&
          data[tokenForSell.address]?.allowance !== '0' ? (
            <button
              type="submit"
              className={
                +balance === 0 ||
                +tokenCountForSell === 0 ||
                +gasPriceData.standard === 0
                  ? 'btn btn__stretched_blocked'
                  : 'btn btn__stretched'
              }
              onClick={(event) => tokenSwapHandler(event)}
              disabled={+balance === 0}
            >
              {+gasPriceData.standard !== 0 ? 'Swap' : 'Insufficient funds'}
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn__stretched"
              onClick={(event) => approveToken(event)}
            >
              Approve token
            </button>
          )
        ) : hasMeta ? (
          <button
            type="submit"
            className="btn btn__stretched"
            onClick={connectWallet}
          >
            Connect to metamask
          </button>
        ) : (
          <a
            type="submit"
            className="btn btn__stretched btn_link"
            href="https://metamask.io"
            target="_blank"
          >
            download metamask (link)
          </a>
        )}
      </div>
      <div className="gas-buttons">
        {btns.map((e) => (
          <TxPriceBtn
            type={e.type}
            className={e.className}
            key={e.type}
            changeTaxCost={changeTaxCost}
          />
        ))}
      </div>
    </form>
  )
}
