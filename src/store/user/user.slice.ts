import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  balance: string
  currentAccount: string
}

const initialState: UserState = {
  balance: '0',
  currentAccount: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeBalance(state, action: PayloadAction<string>) {
      state.balance = action.payload
    },
    changeAccountAddress(state, action: PayloadAction<string>) {
      state.currentAccount = action.payload
    },
  },
})

export const userMetamaskActions = userSlice.actions
export const userMetamaskReducer = userSlice.reducer
