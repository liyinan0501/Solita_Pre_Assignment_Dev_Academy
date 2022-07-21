const initialState = {}
const singleStation = (state = initialState, action) => {
  switch (action.type) {
    case 'getSingleStation':
      return action.payload

    default:
      return state
  }
}

export default singleStation
