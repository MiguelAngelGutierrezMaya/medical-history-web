import axios from 'axios'

import { Router } from '../routes'
import { ObjFormat } from '../utils/obj_format'

export const Patient = {
  saveUpdateProfile: async (data) => {
    const req = ObjFormat.snakeCase(data)
    return await axios
      .put(Router.apiUrlBase + Router.apiIndexCardHolder, req)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
  getPatient: async (data) => {
    const req = ObjFormat.snakeCase(data)
    return await axios
      .get(Router.apiUrlBase + Router.apiIndexCardHolder, { params: req })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}
