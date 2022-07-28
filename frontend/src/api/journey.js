import request from 'utils/request'
import Qs from 'qs'

/**
 * request for all journeys
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

/**
 * request for adding a journey
 * {@param}:
 * @param {string} departure
 * @param {string} return
 * @param {number} departure_station_id
 * @param {number} return_station_id
 * @param {number} duration
 * @param {number} covered_distance
 */
export function addJourney(params) {
  return request({
    method: 'POST',
    url: '/solita/addTrip',
    data: Qs.stringify(params),
  })
}
