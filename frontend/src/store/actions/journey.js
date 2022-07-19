import { getJourneyList } from 'api/journey'

export const journeysAction = (params) => {
  return async (dispatch) => {
    const res = await getJourneyList(params)

    dispatch({
      type: 'getJourneys',
      payload: res,
    })
  }
}
