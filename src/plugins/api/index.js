import { makeRoutes } from './api-routes'

import {
  instance,
  logout,
  setToken,
  refresh,
  getUserFromToken
} from './auth'

export const $api = makeRoutes({ $axios: instance })
export const $auth = { getUserFromToken, setToken, logout }
