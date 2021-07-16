import axios from 'axios'

import { Router } from '../routes'

export const TypeRequest = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiTypeRequest)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
