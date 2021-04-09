import { createSlice } from '@reduxjs/toolkit'
import { Router } from '../routes'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    header: {
      profile: [
        {
          text: 'Mi perfil',
          url: Router.appLogin,
        },
        {
          text: 'Cerrar sesión',
          url: Router.appLogout,
        },
      ],
    },
    sidebar: {
      open: true,
    },
  },
  reducers: {
    openSidebar: (state) => {
      state.sidebar.open = true
    },
    closeSidebar: (state) => {
      state.sidebar.open = false
    },
    toggleSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open
    },
  },
})

export const { openSidebar, closeSidebar, toggleSidebar } = dashboardSlice.actions

export const selectDashboard = (state) => state.dashboard

export default dashboardSlice.reducer
