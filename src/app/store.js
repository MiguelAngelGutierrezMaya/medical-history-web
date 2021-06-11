import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../reducers/dashboardSlice'
import userReducer from '../reducers/userSlice'
import calendarReducer from '../reducers/calendarSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    calendar: calendarReducer,
  },
})
