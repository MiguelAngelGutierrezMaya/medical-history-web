import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../reducers/dashboardSlice'
import userReducer from '../reducers/userSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
})
