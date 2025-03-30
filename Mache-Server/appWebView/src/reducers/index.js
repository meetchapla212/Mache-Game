import { combineReducers } from 'redux'
import roomReducer from './roomReducer'
//import visibilityFilter from './visibilityFilter'

export default combineReducers({
    rooms:roomReducer,
   //visibilityFilter
})