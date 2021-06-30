import axios from 'axios'

import { Router } from '../routes'

export const Diagnose = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiDiagnoses)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
