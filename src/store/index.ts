import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import { tokenApi } from './tokens/token.api'
import { userApi } from './user/user.api'
import { tokensReducer } from './tokens/tokens.slice'
import { modalReducer } from './modal/modal.slice'
import { userMetamaskReducer } from './user/user.slice'
import { inchApi } from './tokens/1inch.api'
import { idSelectorModalReducer } from './modal/idSelectorModal.slice'

export const store = configureStore({
  reducer: {
    [tokenApi.reducerPath]: tokenApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [inchApi.reducerPath]: inchApi.reducer,
    tokensReducer,
    modalReducer,
    userMetamaskReducer,
    idSelectorModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tokenApi.middleware)
      .concat(userApi.middleware)
      .concat(inchApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
