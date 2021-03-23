import axios from 'axios'
import { Router } from '../routes'

export const Auth = {
  tokenAuth: () => sessionStorage.getItem('_token_auth'),
  tokenRefresh: () => sessionStorage.getItem('_token_refresh'),
  isAuthenticated: () => {
    if (Auth.tokenAuth() === null || Auth.tokenAuth() === undefined) return false

    let jwt = parseJwt(Auth.tokenAuth())
    return jwt.exp >= Date.now() / 1000
  },
  getUser: () => {
    if (Auth.tokenAuth() === null) return null

    const jwt = parseJwt(Auth.tokenAuth())
    const user = jwt.user
    user.id = jwt.user_id
    return user
  },
  authenticate: (token) => {
    sessionStorage.setItem('_token_auth', token.access)
    sessionStorage.setItem('_token_refresh', token.refresh)
    localStorage.setItem('user', JSON.stringify(token.user))
  },
  logout: () => {
    sessionStorage.clear()
    localStorage.clear()
  },
  refresh: async () => {
    return await axios
      .post(Router.api, { refresh: Auth.tokenRefresh })
      .then((response) => {
        sessionStorage.setItem('_token_auth', response.data?.access)
        return response
      })
      .catch((error) => {
        return error.response
      })
  },
}

const parseJwt = (token) => {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}
