import axios from 'axios'

import { Router } from '../routes'
import { Auth } from '../utils/auth'

export const Appointment = {
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
}
