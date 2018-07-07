import React, { Component } from "react";
import {
  ContentHeader,
  SessionTokenHeader,
  APIKeyHeader
} from "./RequestHeaders";
import PropTypes from "prop-types";

class SampleRPCRequest extends Component {
  requestStructure = {
    method: "sample.method",
    args: {
      param1: "arg1",
      param2: "arg2"
    },
    signed: "<sha256-encrypted-signature>"
  };
  headers = (api, sessionToken) => {
    return (
      <React.Fragment>
        {api && <APIKeyHeader />}
        {sessionToken && <SessionTokenHeader />}
      </React.Fragment>
    );
  };

  addSampleArgs = params => {
    let args = {};
    params.forEach(param => {
      args[param.param] = `{${param.validation["is_type"]}}`;
    });
    return args;
  };

  render() {
    const { endpointMethod, authentication, endpointParams } = this.props;

    let request = Object.assign({}, this.requestStructure);
    request.method = endpointMethod || request.method;
    request.args = endpointMethod
      ? this.addSampleArgs(endpointParams)
      : request.args;

    const { api_key, session_token } = authentication;
    const headers = this.headers(api_key, session_token);
    console.log(api_key);
    if (api_key === false) {
      delete request.signed;
    }

    return (
      <React.Fragment>
        <ContentHeader />
        {headers}
        <div>
          <pre>{JSON.stringify(request, null, 2)}</pre>
        </div>
      </React.Fragment>
    );
  }
}

SampleRPCRequest.propTypes = {
  authentication: PropTypes.object,
  endpointMethod: PropTypes.string,
  endpointParams: PropTypes.array
};

export default SampleRPCRequest;
