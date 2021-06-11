import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    openTooltip: false,
    lockTooltip: false,
    currentDate: null,
    data: [],
  },
  reducers: {
    openTooltip: (state) => {
      state.openTooltip = true
    },
    closeTooltip: (state) => {
      state.openTooltip = false
    },
    toggleTooltip: (state) => {
      state.openTooltip = !state.openTooltip
    },
    openLockTooltip: (state) => {
      state.lockTooltip = true
    },
    closeLockTooltip: (state) => {
      state.lockTooltip = false
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setCurrentDay: (state, action) => {
      state.currentDate = action.payload
    },
  },
})

export const {
  openTooltip,
  closeTooltip,
  toggleTooltip,
  openLockTooltip,
  closeLockTooltip,
  setData,
  setCurrentDay,
} = calendarSlice.actions

export const selectCalendar = (state) => state.calendar

export default calendarSlice.reducer
