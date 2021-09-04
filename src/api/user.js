import axios from 'axios'

import { Router } from '../routes'
import { Auth } from '../utils/auth'

export const User = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiUser)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  reportUsers: async ({ document, date_init, date_end }) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiReportPatients, {
        params: { document, date_init, date_end },
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  getByRole: async (role) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiUser, {
        params: {
          role
        }
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
