import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import {user} from '../../redux'
import LoginComponent from '../components/user/Login';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../containers/layout/Header';


class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = (username,password) => {
    this.props.dispatch(user.actions.login(username,password))
  };

  renderOrRedirect = () =>{
    let hasSession = user.selectors.isLoggedIn(this.props.state);
    const {error,isLoading} = user.selectors.getSession(this.props.state);
    return hasSession ?
      <Redirect to="/" /> :
      <React.Fragment>
        <Header/>
        <Grid centered columns={2}>
          <Grid.Column>
            <LoginComponent
              doLogin={this.handleLogin}
              isLoading={isLoading || false}
              error={error}
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
  };

  render() {
    return (
      this.renderOrRedirect()
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object
};

export default Login