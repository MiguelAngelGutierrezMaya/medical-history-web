import axios from 'axios'

import { Router } from '../routes'

export const ProductionCenter = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiProductionCenter)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  getByCode: async (code) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiProductionCenter, { params: { code } })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
