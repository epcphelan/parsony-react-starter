import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorResponse extends Component {
  responseStructure = {
    requested: null,
    success: false,
    error: {
      code: 500,
      type: "error_type",
      message: "A short error message.",
      detail: "Description of the error."
    },
    data: {
      received: {}
    }
  };

  addSampleArgs = params => {
    let args = {};
    params.forEach(param => {
      args[param.param] = `{${param.validation["is_type"]}}`;
    });
    return args;
  };

  render() {
    const { method, endpointParams } = this.props;
    const output = this.responseStructure;
    output.data.received = this.addSampleArgs(endpointParams);
    output.requested = method;
    return (
      <React.Fragment>
        <div>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      </React.Fragment>
    );
  }
}

ErrorResponse.propTypes = {
  method: PropTypes.string,
  endpointParams: PropTypes.array
};
ErrorResponse.defaultProps = {
  response: {}
};

export default ErrorResponse;
