import React, { useEffect } from 'react'
import { useAppSelector } from '../hooks/redux'
import ModalListElement from './ModalListElement'
import { IToken } from '../models/IToken'
import useFilteredTokens from '../hooks/useFilteredTokens'

interface ModalListProps {
  search: string
}

export default function ModalList({ search }: ModalListProps) {
  const { tokensList } = useAppSelector((state) => state.tokensReducer)
  const filteredTokens = useFilteredTokens({ search, tokens: tokensList })

  return (
    <>
      <ul className="modal__list">
        {filteredTokens.map((token: IToken) => (
          <ModalListElement
            key={token.address + token.name}
            token={token}
          />
        ))}
      </ul>
    </>
  )
}
