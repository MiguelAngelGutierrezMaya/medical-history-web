import axios from 'axios'

import { Router } from '../routes'

export const RelationshipPersonInCharge = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiRelationshipPersonInCharge)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
