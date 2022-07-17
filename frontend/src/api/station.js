import request from 'utils/request'

/**
 * station list request
 * @returns
 */
export function getStationList() {
  return request({
    method: 'GET',
    url: '/solita/stationlist',
  })
}
