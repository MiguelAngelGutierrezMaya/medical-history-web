import axios from 'axios'

import { Router } from '../routes'

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
}
