import {STATE_BRANCH as BRANCH} from './reducer.js';

export function isLoggedIn(state){
	return state[BRANCH].session.userId;
}

export function getSession(state){
	return state[BRANCH].session;
}

export function getLogin(state) {
  return state[BRANCH].login
}

export function getCreate(state){
  return state[BRANCH].create;
}