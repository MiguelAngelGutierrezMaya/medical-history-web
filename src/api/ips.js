import axios from 'axios'

import { Router } from '../routes'

export const Ips = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiIps)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  getByCode: async (code) => {
    return await axios
      .get(Router.apiUrlBase + Router.apiIps, { params: { code } })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
