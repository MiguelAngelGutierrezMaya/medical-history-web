import axios from 'axios'

import { Router } from '../routes'
import { Auth } from '../utils/auth'

export const UserMedicalHistory = {
  list: async (user_id) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiUserHc, {
        params: {
          user_id
        }
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  save: async (data) => {
    return await axios.post(Router.apiUrlBase + Router.apiUserHc, data).then((response) => {
      return response
    })
      .catch((error) => {
        return error.response
      })
  },
  getUserMedicalHistory: async (id) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiUserHcDetail.replace(':umh_id', id))
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  getReportUserMedicalHistory: async ({ document, date_init, date_end }) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiReportUserClinicalHistories, {
        params: { document, date_init, date_end },
        headers: { Authorization: `Bearer ${Auth.tokenAuth()}` },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  }
}
