import userReducer from './userReducer'
import notificationReducer from './notificationReducer'
import {combineReducers} from 'redux'

export default combineReducers({
  userReducer,
  notificationReducer,
})
