import axios from 'axios'

import { Router } from '../routes'

export const Nacionality = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiNacionalities)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
