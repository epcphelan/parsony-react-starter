import * as TYPES from './types.js';
import {apiReducerHelper as parsonyResponse, apiActionHelper, REQUEST_STATES} from '../helpers/apiHelper.js';

const STATE_BRANCH = "user";

const initialState = {
  session:{
    userId: null,
  },
  login: {
    isLoading: false,
    data: {
      userId: null,
    },
    error: null
  },
  logout: {
    isLoading: false,
    data: null,
    error: null
  },
  create:{
    isLoading: false,
    data: null,
    error: null
  }
};


function login(state, action){
  let reducedState = parsonyResponse(state,action);
  return {...reducedState,
    session:{
      userId: reducedState.login.data.userId
    }
  }
}

function logout(state, action) {
  let res = parsonyResponse(state, action);
  return !res.logout.error ?
    {...res,
      session: initialState.session
    } :
    res;
}

function createUser(state, action){
  let res = parsonyResponse(state,action);
  return (action.payload.status === REQUEST_STATES.SUCCESS) ?
    {...res,
      session: {
        userId: res.create.data.userId
      }
    } :
    res;
}
function loadSession(state,action){
  const {status, data} = action.payload;
  switch (status){
    case REQUEST_STATES.SUCCESS:
      return {...state,
        session: {
          userId: data.userId,
          sessionToken: data.sessionToken
        }
      };
    default:
      return state;
  }
}

function reducer(state = initialState, action){
  let actionType = apiActionHelper(action.type);
  switch (actionType) {
    case TYPES.SESSION:
      return loadSession(state, action);
    case TYPES.LOGOUT:
      return logout(state, action);
    case TYPES.LOGIN:
      return login(state, action);
    case TYPES.SIGNUP:
      return createUser(state, action);
    default:
      return state;
  }
};

export {STATE_BRANCH, reducer}