import axios from 'axios'

import { Router } from '../routes'

export const DiagnosticAids = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiDiagnosticAids)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
