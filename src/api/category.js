import axios from 'axios'

import { Router } from '../routes'

export const Category = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiCategories)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
