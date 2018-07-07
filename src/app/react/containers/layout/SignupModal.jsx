import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'semantic-ui-react';
import {user} from '../../../redux';
import SignupForm from '../../components/user/Signup';

class SignupModal extends Component {
  constructor(props) {
    super(props);
  }

  handleSignup = (username, password) =>{
    this.props.dispatch(user.actions.signup(username,password));
  };

  render() {
    const {error, isLoading} = user.selectors.getCreate(this.props.state);
    return (
      <Modal size='tiny' trigger={<Button inverted primary style={{ marginLeft: '0.5em' }}>Join</Button>}>
        <Modal.Header>New on Parsony</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <SignupForm
              doSignup={this.handleSignup}
              isLoading={isLoading || false}
              error={error}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  state : PropTypes.object,
  dispatch: PropTypes.func
};

SignupModal.defaultProps = {};

export default SignupModal;
