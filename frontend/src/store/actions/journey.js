import { getJourneyList, addJourney } from 'api/journey'

export const journeysAction = (params) => {
  return async (dispatch) => {
    const res = await getJourneyList(params)

    dispatch({
      type: 'getJourneys',
      payload: res,
    })
  }
}

export const addJourneyAction = (params) => {
  console.log('action:', params)
  return async (dispatch) => {
    await addJourney(params)
  }
}
