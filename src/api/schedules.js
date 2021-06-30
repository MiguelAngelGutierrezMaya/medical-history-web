import axios from 'axios'

import { Router } from '../routes'
import { Auth } from '../utils/auth'

export const Schedule = {
  availabilities: async (startDate, endDate) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiAvailabilities, {
        params: { startDate, endDate },
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  addAvailabilities: async (availabilities) => {
    return await axios
      .put(Router.apiUrlBase + Router.apiAvailabilities, availabilities, {
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  appointments: async (startDate, endDate) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiAppointments, {
        params: { startDate, endDate },
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  cancelAppointment: async (data) => {
    return await axios
      .patch(Router.apiUrlBase + Router.apiAppointments, data, {
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  reschedule: async (appointment) => {
    return await axios
      .put(Router.apiUrlBase + Router.apiReschedule, appointment, {
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
