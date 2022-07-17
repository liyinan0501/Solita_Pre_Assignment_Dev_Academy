const initialState = {}

const journey = (state = initialState, action) => {
  switch (action.type) {
    case 'getJourneys':
      return action.payload

    default:
      return state
  }
}

export default journey
