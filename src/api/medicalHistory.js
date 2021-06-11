import axios from 'axios'

import { Router } from '../routes'

export const MedicalHistory = {
  saveHcConfig: async (data) => {
    return await axios
      .post(Router.apiUrlBase + Router.apiHcConfig, data)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiHcConfig)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  getMedicalHistory: async (id) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiHcConfigDetail.replace(':hc_id', id))
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  updateHcConfig: async (data, id) => {
    return await axios
      .put(Router.apiUrlBase + Router.apiHcConfigDetail.replace(':hc_id', id), data)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
