import React from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { INetwork } from '../store/modal/idSelectorModal.slice'

interface IdSelectorProps {
  el: INetwork
}

export default function IdSelectorListElement({ el, closeModal }: any) {
  const { changeCurrentNetwork } = useActions()
  const { currentNetwork } = useAppSelector(
    (state) => state.idSelectorModalReducer
  )

  const chainChanged = async (network: INetwork) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.hex }],
      })
      localStorage.setItem('chaiId', network.hex)
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: network.hex,
                chainName: network.name,
                rpcUrls: network.rpcUrl,
              },
            ],
          })
        } catch (addError) {
          // handle "add" error
        }
      }
    }
  }

  const clickHandler = (el: INetwork) => {
    changeCurrentNetwork(el)
    closeModal()
    chainChanged(el)
  }

  return (
    <li className="modal__list-element">
      <div className="list-element__body">
        <div className="list-element__info">
          <div className="list-element__image">
            <img
              src={el.url}
              alt=""
            />
          </div>
          <div
            className="list-element__text id-selector__text-modal"
            onClick={() => {
              clickHandler(el)
            }}
          >
            {el.name}
          </div>
        </div>
      </div>
    </li>
  )
}
