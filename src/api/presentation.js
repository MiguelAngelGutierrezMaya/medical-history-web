import axios from 'axios'

import { Router } from '../routes'

export const Presentation = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiPresentations)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
