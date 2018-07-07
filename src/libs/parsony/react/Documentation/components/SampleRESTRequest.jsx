import React, { Component } from "react";
import {
  ContentHeader,
  SessionTokenHeader,
  APIKeyHeader
} from "./RequestHeaders";
import PropTypes from "prop-types";

class SampleRESTRequest extends Component {
  requestStructure = {
    param1: "arg1",
    param2: "arg2",
    signed: "<sha256-encrypted-signature>"
  };

  addSampleArgs = params => {
    let args = {};
    params.forEach(param => {
      args[param.param] = `{${param.validation["is_type"]}}`;
    });
    return args;
  };

  headers = (api, sessionToken) => {
    return (
      <React.Fragment>
        {api && <APIKeyHeader />}
        {sessionToken && <SessionTokenHeader />}
      </React.Fragment>
    );
  };

  render() {
    const { endpointParams, authentication, endpointMethod } = this.props;
    let request = Object.assign({}, this.requestStructure);
    request = endpointMethod ? this.addSampleArgs(endpointParams) : request;
    const { api_key, session_token } = authentication;
    const header = this.headers(api_key, session_token);
    if (api_key === false) {
      delete request.signed;
    }
    return (
      <React.Fragment>
        <ContentHeader />
        {header}
        <div>
          <pre>{JSON.stringify(request, null, 2)}</pre>
        </div>
      </React.Fragment>
    );
  }
}

SampleRESTRequest.propTypes = {
  authentication: PropTypes.object,
  endpointMethod: PropTypes.string,
  endpointParams: PropTypes.array
};

export default SampleRESTRequest;
