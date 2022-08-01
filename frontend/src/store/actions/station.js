import { getStationList, getStations, getSingleStation } from 'api/station'

export const stationListAction = () => {
  return async (dispatch) => {
    try {
      const res = await getStationList()

      dispatch({
        type: 'getStationList',
        payload: res,
      })
    } catch (e) {
      console.log('Error', e.message)
    }
  }
}

export const stationsAction = (params) => {
  return async (dispatch) => {
    try {
      const res = await getStations(params)

      dispatch({
        type: 'getStations',
        payload: res,
      })
    } catch (e) {
      console.log('Error', e.message)
    }
  }
}

export const singleStationAction = (params) => {
  return async (dispatch) => {
    try {
      const res = await getSingleStation(params)

      dispatch({
        type: 'getSingleStation',
        payload: res,
      })
    } catch (e) {
      console.log('Error', e.message)
    }
  }
}
