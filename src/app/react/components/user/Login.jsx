import React, {Component} from 'react'
import {Container, Form, Message, Button, Icon} from 'semantic-ui-react'
import PropTypes from 'prop-types';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (e, {name, value}) => {
    this.setState({[name]: value});
  };

  handleSubmit = () => {
    const {username, password} = this.state;
    this.props.doLogin(username, password);
  };

  errorMessage = (error) => {
    if (error && error.code) {
      switch (error.code) {
        case 500:
          switch (error.type) {
            case 'malformed_request':
              return 'Unable to log in. Please enter a valid email & password.';
              break;
            case 'invalid_credentials':
              return 'Username or password not found. Please try again.';
              break;
          }
          break;
        case 404:
          return 'Username not found.';
        default:
          return 'Oh no! Something went wrong.'
      }
    }
    return '';
  };

  render() {
    const error = this.props.error;
    const {username, password} = this.state;
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
    )
  }
}

Login.propTypes = {
  doLogin: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

export default Login