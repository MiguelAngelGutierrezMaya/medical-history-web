import axios from 'axios'

import { Router } from '../routes'

export const Deparment = {
  list: async (countryId) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiDeparments.replace(':countryId', countryId))
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
