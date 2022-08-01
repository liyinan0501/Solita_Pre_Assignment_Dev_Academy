import { getJourneyList, addJourney } from 'api/journey'

export const journeysAction = (params) => {
  return async (dispatch) => {
    try {
      const res = await getJourneyList(params)

      dispatch({
        type: 'getJourneys',
        payload: res,
      })
    } catch (e) {
      console.log('Error', e.message)
    }
  }
}

export const addJourneyAction = (params) => {
  console.log('action:', params)
  return async (dispatch) => {
    try {
      await addJourney(params)
    } catch (e) {
      console.log('Error', e.message)
    }
  }
}
