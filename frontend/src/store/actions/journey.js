import request from 'utils/request'

export const journeysAction = (params) => {
  return async (dispatch) => {
    const res = await request.get('/solita/trips', { params })

    dispatch({
      type: 'getJourneys',
      payload: res,
    })
  }
}
