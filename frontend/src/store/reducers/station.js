const initialState = []

const stations = (state = initialState, action) => {
  switch (action.type) {
    case 'getStations':
      return action.payload

    default:
      return state
  }
}

export default stations
