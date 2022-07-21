const initialState = {}

const showDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'showDetail':
      return action.payload

    default:
      return state
  }
}

export default showDetail
