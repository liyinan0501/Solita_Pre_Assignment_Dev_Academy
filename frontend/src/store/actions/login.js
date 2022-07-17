import { loginRequest } from 'api/user'
import { setToken, removeToken } from 'utils/token'

export const loginAction = (username, password) => {
  return async (dispatch) => {
    const res = await loginRequest(username, password)
    const { token } = res
    dispatch({
      type: 'login/token',
      payload: token,
    })
    setToken(token)
  }
}

export const logout = (username, password) => {
  return (dispatch) => {
    dispatch({ type: 'login/removeToken' })
    removeToken()
  }
}
