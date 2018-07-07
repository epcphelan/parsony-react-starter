import * as TYPES from './types.js';
import {request} from '../helpers/apiHelper.js';

export function loadValidSession(){
  return dispatch => request('user.loadSession', {}, TYPES.SESSION, dispatch)
}

export function login(username, password){
  return dispatch => request('user.login', {username, password}, TYPES.LOGIN, dispatch)
}

export function logout(){
  return dispatch => request('user.logout', {}, TYPES.LOGOUT, dispatch)
}

export function signup(username, password){
    return dispatch => request('user.create',{username, password},TYPES.SIGNUP,dispatch)
}