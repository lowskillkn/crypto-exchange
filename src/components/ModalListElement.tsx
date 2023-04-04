import React from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IToken } from '../models/IToken'

interface ModalListElementProps {
  token: IToken
}

interface ClickHandlerProps {
  token: IToken
  typeOfModal: string
}

export default function ModalListElement({ token }: ModalListElementProps) {
  const { closeModal, changeToken } = useActions()
  const { typeOfModal } = useAppSelector((state) => state.modalReducer)

  return (
    <li
      className="modal__list-element list-element"
      onClick={() => {
        closeModal()
        changeToken({ token, typeOfModal })
      }}
    >
      <div className="list-element__body">
        <div className="list-element__info">
          <div className="list-element__image">
            <img
              src={token.logoURI}
              alt=""
            />
          </div>
          <div className="list-element__text">
            <div className="list-element__token-name">{token.name}</div>
            <div className="list-element__token-value">{token.symbol}</div>
          </div>
        </div>
        <div className="list-element__token-price"></div>
      </div>
    </li>
  )
}
