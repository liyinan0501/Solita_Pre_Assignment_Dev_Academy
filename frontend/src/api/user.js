import request from 'utils/request'
import Qs from 'qs'

/**
 * request for login
 * @param {string} username
 * @param {string} password
 * @returns
 */
export const loginRequest = (username, password) => {
  return request({
    method: 'POST',
    url: '/api/login',
    data: Qs.stringify({
      username,
      password,
    }),
  })
}
