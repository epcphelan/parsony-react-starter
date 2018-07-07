import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Menu, Container, Button} from 'semantic-ui-react';
import {user} from '../../../redux';
import {Link} from 'react-router-dom'
import Login from './LoginModal';
import Signup from './SignupModal';
import Logout from '../../components/user/Logout';

class Header extends Component {

  sessionControls = () => {
    const loggedIn = user.selectors.isLoggedIn(this.props.state);
    return loggedIn ?
      this.renderLogout() :
      this.renderLoginSignup()

  };

  renderLoginSignup = () =>{
    return (
      <React.Fragment>
        <Login
          state={this.props.state}
          dispatch={this.props.dispatch}
        />
        <Signup
          state={this.props.state}
          dispatch={this.props.dispatch}
        />
      </React.Fragment>
    )
  };

  renderLogout = () => {
    return (
      <Logout
        doLogout={this.handleLogout}
      />
    )
  };

  handleLogout = () =>{
    this.props.dispatch(user.actions.logout());
  };

  render() {
    return (
      <Menu inverted fixed='top' size='large'>
        <Container>
          <Menu.Item as={Link} to="/">Home</Menu.Item>
          <Menu.Item as={Link} to="/api">Docs</Menu.Item>
          <Menu.Item position='right'>
            {this.sessionControls()}
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

Header.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
Header.defaultProps = {};

export default Header;
