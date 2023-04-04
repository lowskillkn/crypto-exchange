import React from 'react'
import Info from './Info'
import Selector from './Selector'

interface IInputBlock {
  type: string
}

export default function InputBlock({ type }: IInputBlock) {
  


  return (
    <div className={type === 'sell' ? 'InputBlock InputBlock_dark' : 'InputBlock'}>
      <Info
        type={type}
        hasButton={type === 'sell' && true}
      />
      <Selector type={type} />
    </div>
  )
}
