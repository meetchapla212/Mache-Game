import { LOGIN_USER_DETAILS, GET_ROOM_MEMBER_WEB_VIEW_RESPONSE } from '../actions/types';

const initialState = { 
    loginUser:{},
    roomUsers:[]
}


const roomReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER_DETAILS:
      //console.log("LOGIN_USER_DETAILS ==>", action.payload.data);
        return {
            ...state,
            loginUser:action.payload.data
          }
      case GET_ROOM_MEMBER_WEB_VIEW_RESPONSE:
        //console.log("GET_ROOM_MEMBER_WEB_VIEW_RESPONSE ==>", action.payload.data);
        return {
            ...state,
            roomUsers:action.payload.data
          }
      default:
        return state
    }
  }
  
  export default roomReducer