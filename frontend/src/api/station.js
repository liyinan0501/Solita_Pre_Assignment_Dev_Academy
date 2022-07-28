import request from 'utils/request'

/**
 * request for the station list
 */
export function getStationList() {
  return request({
    method: 'GET',
    url: '/solita/stationlist',
  })
}

/**
 * request for
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

/**
 * request for a single station
 * @param {number} stationId
 */
export function getSingleStation(params) {
  return request({
    method: 'GET',
    url: `solita/singlestation/${params}`,
  })
}
