import axios from 'axios'

import { Router } from '../routes'

export const Specialist = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiSpecialist)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
