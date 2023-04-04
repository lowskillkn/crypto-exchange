import React, { useMemo } from 'react'
import { IToken } from '../models/IToken'

interface UseFilteredTokensProps {
  search: string
  tokens: IToken[]
}

export default function useFilteredTokens({
  search,
  tokens,
}: UseFilteredTokensProps) {
  const searchedTokens = useMemo(() => {
    return tokens.filter((token) =>
      token.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return searchedTokens
}
