import axios from 'axios'

import { Router } from '../routes'

export const Exam = {
  list: async () => {
    return await axios
      .get(Router.apiUrlBase + Router.apiExam)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  }
}
