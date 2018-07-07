import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react'


class Logout extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Button onClick={this.props.doLogout}>
        Log out
      </Button>
    )
  }
}

Logout.propTypes = {
  doLogout : PropTypes.func
};
export default Logout