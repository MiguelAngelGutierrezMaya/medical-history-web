import axios from 'axios'

import { Router } from '../routes'

export const ExternalCause = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiExternalCause)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
