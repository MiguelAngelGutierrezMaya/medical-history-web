import axios from 'axios'

import { Router } from '../routes'

export const SexualOrientation = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiSexualOrientations)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
