import axios from 'axios'

import { Router } from '../routes'

export const Scholarship = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiScholarship)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
