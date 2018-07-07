import {combineReducers} from 'redux';
import * as user from './user';


function loadServiceReducers(services = []) {
  let obj = {};
  services.forEach((service) => {
    if (service.hasOwnProperty('reducer')
      && service['reducer'].hasOwnProperty('STATE_BRANCH')
      && service['reducer'].hasOwnProperty('reducer')) {
      obj[service['reducer']['STATE_BRANCH']] = service['reducer']['reducer']
    }
  });
  return obj;
}

let serviceReducers = loadServiceReducers([
  user
]);

serviceReducers.state = (state = {}) => state;

const rootReducer = combineReducers(serviceReducers);

export {rootReducer as reducer};

export {user}