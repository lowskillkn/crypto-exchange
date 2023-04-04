import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { tokensActions } from '../store/tokens/tokens.slice'
import { modalActions } from '../store/modal/modal.slice'
import { userMetamaskActions } from '../store/user/user.slice'
import { idSelectorModalActions } from '../store/modal/idSelectorModal.slice'

const actions = {
  ...tokensActions,
  ...modalActions,
  ...userMetamaskActions,
  ...idSelectorModalActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
