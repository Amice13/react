/*@
* This plugins serves for managing the in-memory JWT access token
*/ 

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const instance = axios.create({
  baseURL: process.env.BACKEND_HOST ? process.env.BACKEND_HOST : 'http://localhost:3000/api/v1',
  withCredentials: true
})

import storeSetup from '@store'
const { store } = storeSetup() 
import { setUsersId } from '@store/layout'

// Library to decode JWT token
import { jwtDecode } from 'jwt-decode'

// Library to login and logout in other browser tabs
import { BroadcastChannel } from 'broadcast-channel'

const channelName = process.env.APP_NAME + (process.env.IS_TEST ? '-test' : '')
const channel = new BroadcastChannel(channelName)

// List of paths to ignore (related to auth only)
const pathsToIgnore = [
  '/auth/initialize',
  '/auth/google-verify',
  '/auth/refresh'
]

// Custom function to extract and decode JWT from the header
// It checks the expiration of the token and refreshes it in advance
export const checkToken = (token) => {
  if (!token) return false
  const decoded = jwtDecode(token)
  if (!decoded.iat || !decoded.exp) return false
  return decoded.exp - new Date().getTime() > 1000 * 60
}

export const logout = async () => {
  instance.defaults.headers.common.Authorization = ''
  document.cookie = 'Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
  store.dispatch(setUsersId(-1))
  useNavigate('./login')
}

// Function to login
export const setToken = async (token) => {
  // This request sets the proper cookie with refresh token and receive the access token as well
  if (!token) {
    channel.postMessage({ method: 'post', token: '' })
    return logout()
  }
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
  channel.postMessage({ method: 'post', token })
}

// Set refresh cache to avoid multiple requests
let refreshCache

// Function to check the actual token and refresh it if necessary
export const refresh = async () => {
  let token = instance.defaults?.headers?.common?.Authorization ? instance.defaults.headers.common.Authorization.split(/ |%20/)[1] : undefined
  // If no need to change the token
  if (checkToken(token)) return false
  // Ask for a new token for new tabs
  channel.postMessage({ method: 'get' })
  // Await for the response
  await new Promise(resolve => setTimeout(resolve, 300))
  let newToken = instance.defaults?.headers?.common?.Authorization ? instance.defaults?.headers?.common?.Authorization.split(/ |%20/)[1] : undefined
  // If the new token is set, then continue
  if (checkToken(newToken)) return false
  // Receive the new token from the server
  // We want to check the cached request and await it
  if (refreshCache && refreshCache instanceof Promise) return await refreshCache
  refreshCache = instance.get('/auth/refresh').catch(error => ({ error }))
  const req = await refreshCache
  if (req.error) return logout()
  // Set the header and send token to other tabs
  instance.defaults.headers.common.Authorization = `Bearer ${req.data.data.accessToken}`
  channel.postMessage({ method: 'post', token: req.data.data.accessToken })
}

// Broadcasting the token over other tabs
channel.onmessage = ({ method, token }) => {
  // If token was removed, then logout
  if (method === 'get' && instance.defaults?.headers?.common?.Authorization) {
    return channel.postMessage({ method: 'post', token: instance.defaults.headers.common.Authorization.split(/ /)[1] })
  }
  if (method === 'post' && !token) {
    instance.defaults.headers.common.Authorization = ''
    document.cookie = 'rt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    store.dispatch(setUsersId(-1))
  }
  if (method === 'post' && token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export const getUserFromToken = (token) => {
  return jwtDecode(token)
}

instance.interceptors.request.use(async config => {
  if (pathsToIgnore.includes(config.url)) return config
  await refresh()
  config.headers.Authorization = instance.defaults.headers.common.Authorization
  return config
})

instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  if (error.response.status === 403) logout()
  return Promise.reject(error)
})

instance.interceptors.request.use(async config => {
  if (pathsToIgnore.includes(config.url)) return config
  await refresh()
  config.headers.Authorization = instance.defaults.headers.common.Authorization
  return config
})
