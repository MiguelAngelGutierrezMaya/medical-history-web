import axios from 'axios'

import { Router } from '../routes'

export const TypeDegreeDisability = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiTypeDegreeDisability)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
