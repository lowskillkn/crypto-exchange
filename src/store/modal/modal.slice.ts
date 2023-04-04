import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isModal: boolean
  typeOfModal: string
  filter: string
}

const initialState: ModalState = {
  isModal: false,
  typeOfModal: '',
  filter: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<string>) {
      state.isModal = true
      state.typeOfModal = action.payload
    },
    closeModal(state) {
      state.isModal = false
      state.typeOfModal = ''
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
