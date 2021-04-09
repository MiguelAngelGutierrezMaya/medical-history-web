import axios from 'axios'

import { Router } from '../routes'

export const UsualOccupation = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiUsualOccupations)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
