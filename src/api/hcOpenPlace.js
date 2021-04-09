import axios from 'axios'

import { Router } from '../routes'

export const HcOpenPlace = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiHcOpenPlace)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
