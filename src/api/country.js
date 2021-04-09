import axios from 'axios'

import { Router } from '../routes'

export const Country = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiCountries)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
