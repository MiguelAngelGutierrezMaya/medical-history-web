import axios from 'axios'

import { Router } from '../routes'

export const EthnicGroup = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiEthnicGroup)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
