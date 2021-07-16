import axios from 'axios'

import { Router } from '../routes'

export const State = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiState)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
