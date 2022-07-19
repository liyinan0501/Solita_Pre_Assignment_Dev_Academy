import request from 'utils/request'

/**
 * all stations request
 * {@param}:
 * @param {number} pageNumber
 * @param {number} pageSize
 * @param {number} departureStationId
 * @param {string} departureDate
 * @param {string} returnDate
 */
export function getJourneyList(params) {
  return request({
    method: 'GET',
    url: '/solita/trips',
    params,
  })
}
