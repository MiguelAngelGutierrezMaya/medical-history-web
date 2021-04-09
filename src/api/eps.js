import axios from 'axios'

import { Router } from '../routes'

export const Eps = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiEps)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
