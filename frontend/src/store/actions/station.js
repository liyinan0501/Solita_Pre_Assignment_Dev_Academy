import { getStationList, getStations } from 'api/station'

export const stationListAction = () => {
  return async (dispatch) => {
    const res = await getStationList()

    dispatch({
      type: 'getStationList',
      payload: res,
    })
  }
}

export const stationsAction = (params) => {
  return async (dispatch) => {
    const res = await getStations(params)

    dispatch({
      type: 'getStations',
      payload: res,
    })
  }
}
