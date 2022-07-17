import request from 'utils/request'
import Qs from 'qs'

/**
 * login request
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
