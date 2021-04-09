import axios from 'axios'

import { Router } from '../routes'

export const HcTransferTo = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiHcTransferTo)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
