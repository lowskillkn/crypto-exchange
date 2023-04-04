import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import ModalList from './ModalList'

export default function Modal() {
  const { closeModal } = useActions()
  const [search, setSearch] = useState('')

  return (
    <div className="Modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="modal__title">Selact a token</div>
          <div
            className="modal__close"
            onClick={() => closeModal()}
          >
            &times;
          </div>
        </div>
        <div className="modal__search">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search token"
            className="modal__text"
          />
        </div>
        <ModalList search={search} />
      </div>
    </div>
  )
}
