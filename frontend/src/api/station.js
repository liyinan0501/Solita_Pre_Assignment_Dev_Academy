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

/**
 * all stations request
 * {@param}:
 * @param {number} pageNumber
 * @param {number} pageSize
 * @param {number} stationId
 */
export function getStations(params) {
  return request({
    method: 'GET',
    url: 'solita/stations',
    params,
  })
}
