import axios from 'axios'

import { Router } from '../routes'

export const City = {
  list: async (deparmentId) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiCities.replace(':deparmentId', deparmentId))
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
