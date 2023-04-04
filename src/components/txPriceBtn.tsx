import React from 'react'

export default function (props: any) {
  return (
    <button
      className={props.className}
      onClick={(event) => props.changeTaxCost(event, props.type)}
    >
      {props.type}
    </button>
  )
}
