import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Container, Form, Button, Message, Icon} from 'semantic-ui-react';

class PasswordRecovery extends Component {
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} error={error !== null}>
          <Form.Input
            name='username'
            value={username}
            fluid
            placeholder='E-mail address'
            onChange={this.handleInputChange}
          />
          <Form.Input
            name='password'
            value={password}
            fluid
            placeholder='Password'
            type='password'
            onChange={this.handleInputChange}
          />
          <Button primary fluid size='large'>Login</Button>
          <Message error>
            <Icon name='warning'/>
            {this.errorMessage(error)}
          </Message>
        </Form>
      </Container>
    );
  }
}

PasswordRecovery.propTypes = {};
PasswordRecovery.defaultProps = {};

export default PasswordRecovery;
