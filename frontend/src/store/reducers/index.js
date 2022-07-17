import { combineReducers } from 'redux'
import login from './login'
import station from './station'
import journey from './journey'

export default combineReducers({ login, station, journey })
