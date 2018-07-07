import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SuccessResponse extends Component {
  responseStructure = {
    requested: "sample.method",
    success: true,
    error: null,
    data: {
      "key1":"value1",
      "key2":"value2"
    }
  };

  render() {
    const {method,response} = this.props;
    const output = this.responseStructure;
    output.requested = method || output.requested;
    output.data = method? response : output.data;
    return (
    <React.Fragment>
      <div>
        <pre>{JSON.stringify(output,null,2)}</pre>
      </div>
    </React.Fragment>
    );
  }
}

SuccessResponse.propTypes = {
  method: PropTypes.string,
  response: PropTypes.object
};

export default SuccessResponse;
