import axios from 'axios'

import { Router } from '../routes'

export const Medicine = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiMedicine)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
