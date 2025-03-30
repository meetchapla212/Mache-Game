import socketIOClient from "socket.io-client";
import { LOGIN_USER_DETAILS, GET_ROOM_MEMBER_WEB_VIEW_RESPONSE } from './types';
import { Config } from '../Config';
const socket = socketIOClient(Config.ENDPOINT);
const url = Config.apiUrl;
let header = {
    "api_key": Config.api_key 
}


export const getLoginUserDetails = (token) => {
	return (dispatch) => {
		header.Authorization = `Bearer ${token}`;
        fetch(url + "profile", {
            "method": "GET",
            "headers": header
        })
        .then(response => response.json())
        .then(data => dispatch({
            type: LOGIN_USER_DETAILS,
            payload: data
        }))
	}	
}

export const getRoomMemberWebViewSend= (room_id,user_id) => {
	return (dispatch) => {
		socket.emit('GETROOMMEMBERWEBVIEW_SEND',room_id, user_id);
	}	
}

export const getRoomMemberWebViewResponse= () => {
	return (dispatch) => {
		socket.on('GETROOMMEMBERWEBVIEW_RESPONSE', data => {
            if (data.status) {
                dispatch({
                    type: GET_ROOM_MEMBER_WEB_VIEW_RESPONSE,
                    payload: data
                })
            }
        })
	}	
}