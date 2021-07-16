import axios from 'axios'

import { Router } from '../routes'

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
