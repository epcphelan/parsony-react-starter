// Library for using Parsony API

const axios = require('axios');

const DEFAULT_METHODS = {
  apiDocs: 'api.documentation',
  loadSession: 'user.loadSession',
  errorCheck: 'parsony.error',
  login: 'user.login',
  logout: 'user.logout'
};

const HTTP_ERRORS = {
  404: '404 - Page not Found',
  500: '500 - Server Error',
  503: '503 - Service Unavailable'
};

const defaultError = {
  code: 503,
  type: 'networking_failure',
  message: 'API request could not be completed.',
  detail: HTTP_ERRORS[503],
};

class Parsony {
  constructor(endpoint = '/json-api') {
    this.apiEndpoint = endpoint;
    this.unauthorizedHook = null;
    this.dispatch = () => {
    };
  }

  setUnauthorizedHook(hookFunction) {
    this.unauthorizedHook = hookFunction;
  }

  callUnauthorizedHook() {
    if (this.unauthorizedHook) this.unauthorizedHook(this.dispatch);
  }

  processResponse(httpResponse) {
    if (httpResponse.status === 200) {
      let apiResponse = httpResponse.data;
      if (apiResponse.success) {
        return apiResponse.data;
      }
      else if (apiResponse.error) {
        if (apiResponse.error.code === 401) {
          this.callUnauthorizedHook();
        }
        throw apiResponse.error;
      }
      else {
        throw defaultError;
      }
    }
  }


  async request(method, payload, unauthHandler = () => {
  }) {
    this.setUnauthorizedHook(unauthHandler);
    let result = null;
    let processed = null;
    let request = {
      method:'POST',
      url:this.apiEndpoint,
      data:{
        method,
        args: payload
      },
      headers:{
        'Content-Type': 'application/json'
      }
    };
    try {
      result = await axios(request);
    }
    catch (err) {
      throw defaultError
    }
    try {
      processed = this.processResponse(result);
    }
    catch (err) {
      throw err;
    }
    return processed;
  }
}

export {Parsony, DEFAULT_METHODS};