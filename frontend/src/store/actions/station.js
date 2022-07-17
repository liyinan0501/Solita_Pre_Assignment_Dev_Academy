import { getStationList } from 'api/station'

export const stationListAction = () => {
  return async (dispatch) => {
    const res = await getStationList()

    dispatch({
      type: 'getStationList',
      payload: res,
    })
  }
}
