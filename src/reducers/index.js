import { combineReducers } from 'redux'
import markersReducer from 'reducers/markersReducer'

export default combineReducers({ markers: markersReducer })
