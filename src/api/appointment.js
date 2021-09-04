import axios from 'axios'

import { Router } from '../routes'
import { Auth } from '../utils/auth'

export const Appointment = {
  listAppointmentPurpose: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiAppointmentPurposes)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  savePatienAppointment: async (data) => {
    return await axios
      .post(Router.apiUrlBase + Router.apiPatientAppointments, data, {
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  reportAppointments: async ({ date_init, date_end }) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiReportAppointments, {
        params: { date_init, date_end },
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
