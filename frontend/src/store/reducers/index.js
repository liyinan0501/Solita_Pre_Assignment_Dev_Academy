import { combineReducers } from 'redux'
import login from './login'
import stationList from './stationList'
import journey from './journey'
import stations from './station'

export default combineReducers({ login, stationList, journey, stations })
