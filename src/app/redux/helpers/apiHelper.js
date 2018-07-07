import {Parsony, DEFAULT_METHODS} from '../../../libs/parsony/index';
const parsony = new Parsony();

const UNAUTHORIZED = 'ACCESS_UNAUTHORIZED';

const REQUEST_STATES = {
  FETCHING: "fetching",
  SUCCESS: "success",
  ERROR: "error"
};


function _unauthorizedAccessAction(dispatch){
  return () => {
    dispatch({type: UNAUTHORIZED, payload: null})
  }
}

async function makeParsonyRequest(method, payload, action, dispatch){
  dispatch({type: `${action} [REQUEST]`, payload: {status: REQUEST_STATES.FETCHING}});
  parsony.request(method, payload, _unauthorizedAccessAction(dispatch))
    .then(
      data => dispatch({
        type: `${action} [RESPONSE]`,
        payload: {
          status: REQUEST_STATES.SUCCESS,
          data
        }
      })
    )
    .catch(
      error => dispatch({
        type: `${action} [RESPONSE]`,
        payload: {
          status: REQUEST_STATES.ERROR,
          error
        }
      })
    )
}

function parsonyResponse(state, action) {
  let branch = stripReqRes(action.type);
  let payload = action.payload;
  if (payload) {
    let branchObj = {};
    switch (payload.status) {
      case REQUEST_STATES.FETCHING:
        branchObj = {isLoading: true, error: null};
        break;
      case REQUEST_STATES.SUCCESS:
        branchObj = {isLoading: false, data: payload.data, error: null};
        break;
      case REQUEST_STATES.ERROR:
        branchObj = {isLoading: false, error: payload.error};
    }
    let mergedBranch = {};
    mergedBranch[branch] = Object.assign({}, state[branch], branchObj);
    return Object.assign({}, state, mergedBranch);
  }
  return state;

}

function stripReqRes(actionType) {
  return actionType.replace(' [RESPONSE]', '').replace(' [REQUEST]', '');
}

export {makeParsonyRequest as request}
export {parsonyResponse as apiReducerHelper}
export {stripReqRes as apiActionHelper}
export {DEFAULT_METHODS as parsonyAuth}
export {REQUEST_STATES}
