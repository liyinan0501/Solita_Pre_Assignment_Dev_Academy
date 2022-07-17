import axios from 'axios'
import { removeToken, hasToken, getToken } from './token'

export const baseURL = 'http://127.0.0.1:3007/'

const request = axios.create({
  baseURL,
  timeout: 5000,
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (hasToken()) {
      config.headers.Authorization = `${getToken()}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
