import React, { useState, useEffect } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import IdSelectorListElement from './idSelectorListElement'

export default function IdSelectorModal() {
  const [isModal, setIsModal] = useState(false)
  const { networksList } = useAppSelector(
    (state) => state.idSelectorModalReducer
  )
  const { currentNetwork } = useAppSelector(
    (state) => state.idSelectorModalReducer
  )
  const { changeCurrentNetwork } = useActions()

  useEffect(() => {
    const network = networksList.filter(
      (e) => e.id === localStorage.getItem('chainId')
    )
    changeCurrentNetwork(network[0])
  }, [])

  const closeModal = () => {
    setIsModal(false)
  }

  return (
    <div className="id-selector">
      <div className="id-selector__body">
        <div
          className="id-selector__selected-net"
          onClick={() => {
            setIsModal(true)
          }}
        >
          <div className="id-selector__title_flex">
            <div className="list-element__image">
              <img
                className="modal-list-element__image"
                src={currentNetwork?.url}
                alt=""
              />
            </div>
            {currentNetwork?.name}
          </div>
        </div>
        {isModal && (
          <div className="Modal id-selector__modal">
            <div className="modal__body">
              <div className="modal__header">
                <div className="modal__title id-selector__title id-selector__title_flex">
                  <div className="list-element__text">Change network</div>
                </div>
                <button
                  className="modal__close"
                  onClick={(event) => {
                    event.stopPropagation()

                    setIsModal(false)
                  }}
                >
                  &times;
                </button>
              </div>
              <ul className="id-selector__modal-list">
                {networksList.map((network) => {
                  return (
                    <IdSelectorListElement
                      key={network.id}
                      el={network}
                      closeModal={closeModal}
                    />
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
