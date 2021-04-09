import axios from 'axios'

import { Router } from '../routes'

export const SpecialPopulation = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiSpecialPopulations)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
