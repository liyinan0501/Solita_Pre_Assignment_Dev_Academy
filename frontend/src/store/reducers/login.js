const initialState = ''

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'login/token':
      return action.payload

    case 'login/removeToken':
      return initialState

    default:
      return state
  }
}

export default login
