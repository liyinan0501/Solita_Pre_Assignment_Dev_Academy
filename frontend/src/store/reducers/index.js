import { combineReducers } from 'redux'
import login from './login'
import stationList from './stationList'
import journey from './journey'
import stations from './station'
import singleStation from './singleStation'
import showDetail from './showDetail'

export default combineReducers({
  login,
  stationList,
  journey,
  stations,
  singleStation,
  showDetail,
})
