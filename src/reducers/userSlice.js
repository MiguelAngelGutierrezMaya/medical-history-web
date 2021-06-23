import { createSlice } from '@reduxjs/toolkit'
import { Auth } from '../utils/auth'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: Auth.getUser(),
  },
  reducers: {
    authenticate: (state, action) => {
      state.value = action.payload
    },
    logout: (state) => {
      state.value = null
      Auth.logout()
      window.location = '/login'
    },
  },
})

export const { authenticate, logout } = userSlice.actions

export const selectedUser = (state) => state.user.value

export default userSlice.reducer
