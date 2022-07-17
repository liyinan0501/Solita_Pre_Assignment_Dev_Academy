const initialState = []

const station = (state = initialState, action) => {
  switch (action.type) {
    case 'getStationList':
      return action.payload

    default:
      return state
  }
}

export default station
