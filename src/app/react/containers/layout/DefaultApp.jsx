import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import {Container, Segment} from 'semantic-ui-react';

class DefaultAppLayout extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Container>
        <Header state={this.props.state} dispatch={this.props.dispatch}/>
        <Container style={{ marginTop: '7em' }}>
          {this.props.children}
        </Container>
      </Container>
    )
  }
}

DefaultAppLayout.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};

export default DefaultAppLayout;
