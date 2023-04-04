import React, { useState } from 'react'
import './App.css'
import IdSelectorModal from './components/IdSelectorModal'
import Modal from './components/Modal'
import SwapBody from './components/SwapBody'
import { useAppSelector } from './hooks/redux'

function App() {
  const { isModal } = useAppSelector((state) => state.modalReducer)
  


  return (
    <>
      <div className="App">
        <SwapBody />
        {isModal && <Modal />}
        <IdSelectorModal />
      </div>
    </>
  )
}

export default App
