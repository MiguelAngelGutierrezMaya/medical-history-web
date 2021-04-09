import axios from 'axios'

import { Router } from '../routes'

export const SocialSecurityScheme = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiSocialSecuritySchemes)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
