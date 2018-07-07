import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'semantic-ui-react';
import {user} from '../../../redux';
import LoginForm from '../../components/user/Login';

class LoginModal extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = (username, password) =>{
    this.props.dispatch(user.actions.login(username,password));
  };

  render() {
    const {error, isLoading} = user.selectors.getLogin(this.props.state);
    return (
      <Modal size='tiny' trigger={<Button inverted>Login</Button>}>
        <Modal.Header>Login to Parsony</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm
              doLogin={this.handleLogin}
              isLoading={isLoading || false}
              error={error}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  state : PropTypes.object,
  dispatch: PropTypes.func
};

LoginModal.defaultProps = {};

export default LoginModal;
