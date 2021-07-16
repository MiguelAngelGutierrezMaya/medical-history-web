import axios from 'axios'

import { Router } from '../routes'

export const Program = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiProgram)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
