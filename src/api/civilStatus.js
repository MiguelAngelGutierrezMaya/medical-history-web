import axios from 'axios'

import { Router } from '../routes'

export const CivilStatus = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiCivilStatus)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
