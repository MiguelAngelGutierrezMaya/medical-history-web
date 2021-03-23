import axios from 'axios'

import { Router } from '../routes'

export const Security = {
  login: async (credentials) => {
    return await axios
      .post(Router.apiUrlBase + Router.apiLogin, credentials)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  resetPassword: async (email) => {
    return await axios
      .post(Router.apiUrlBase + Router.apiResetPassword, email)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  resetPasswordConfirm: async (email) => {
    return await axios
      .post(Router.apiUrlBase + Router.apiResetPasswordConfirm, email)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
