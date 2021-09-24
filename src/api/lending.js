import axios from 'axios'

import { Router } from '../routes'

export const Lending = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiLending)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
