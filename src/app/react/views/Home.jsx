import React, {Component} from 'react'
import {Container} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import DefaultLayout from '../containers/layout/DefaultApp';
import logoImg from '../../../assets/img/200_x_200_logo.png';
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DefaultLayout state={this.props.state} dispatch={this.props.dispatch}>
        <Container style={{marginTop: '20em', textAlign:'center'}}>
          <img src={logoImg}/>
          <h1>Hello, world. I'm Parsony.</h1>
          <h4>Now, make something.</h4>
        </Container>
      </DefaultLayout>
    )
  }
}

Home.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};

export default Home