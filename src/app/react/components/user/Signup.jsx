import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Message, Icon} from 'semantic-ui-react';
import { ERRORS } from '../../utils';
class Signup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false,
      email:'',
      emailInvalid : true,
      password:'',
      passwordInvalid: true,
      passwordConfirm:'',
      passwordConfirmInvalid: true,
      passwordsMatch:false,
      termsAgreed : false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.error !== nextProps.error){
      this.handleRequestErrors(nextProps.error);
    }
  }

  handleRequestErrors = (error) =>{
    if (error) {
      const {code, type, detail} = error;
      switch (code) {
        case 500:
          switch (type) {
            case 'malformed_request':
              detail.forEach((e) =>{
                if(e.code ==='invalid_email') this.setState({emailInvalid:true});
                if(e.code ==='min_length_not_met') this.setState({passwordInvalid:true});
              });
              break;
          }
          break;
        case 409:
          switch (type) {
            case 'duplicate_error':
              this.setState({emailInvalid: true});
              break;
          }
      }
    }
  };

  validateEmail = () =>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({emailInvalid:!re.test(this.state.email)})
  };

  validatePasswords = () => {
    const minLength = 1;
    const{password, passwordConfirm} = this.state;
    this.setState({passwordInvalid:password.length < minLength});
    this.setState({passwordConfirmInvalid:passwordConfirm.length < minLength});
    this.setState({passwordsMatch:password===passwordConfirm});
  };

  validateForm = () =>{
    const {emailInvalid, passwordInvalid, passwordConfirmInvalid, passwordsMatch, termsAgreed} = this.state;
    return !emailInvalid && !passwordInvalid && !passwordConfirmInvalid && passwordsMatch && termsAgreed;
  };

  handleSubmit = () =>{
    const {email, password } = this.state;
    this.setState({formSubmitted:true});
    if(this.validateForm()){
      this.props.doSignup(email, password);
    }
  };

  handleInputChange = (e,{name, value}) => {
    this.setState({[name]:value},()=>{
      this.validateEmail();
      this.validatePasswords();
    });
  };

  handleCheckboxChange = (e, {name}) =>{
    this.setState({[name]:!this.state[name]},()=>{
      this.validateEmail();
      this.validatePasswords();
    })
  };

  errorMessage = (error) => {
    if (error) {
      const {code, type, detail} = error;
      switch (code) {
        case 500:
          switch (type) {
            case 'malformed_request':
              return malformedErrorMsg(detail);
              break;

            case 'record_not_created':
              return ERRORS.CREATE_ACCOUNT.GENERIC;
          }
          break;
        case 409:
          switch(type){
            case 'duplicate_error':
              return ERRORS.CREATE_ACCOUNT.EXISTS;
              break;
          }
      }
    }
    return ERRORS.DEFAULT;
    function malformedErrorMsg(errors){
      let msg = [];
      errors.forEach((e) =>{
        if(e.code ==='invalid_email') msg.push(ERRORS.CREATE_ACCOUNT.MALFORMED_EMAIL);
        if(e.code ==='min_length_not_met') msg.push(ERRORS.CREATE_ACCOUNT.MALFORMED_PASSWORD);
      });
      return msg.join(' ');
    }
  };

  render() {
    const { emailInvalid, formSubmitted, passwordInvalid, passwordConfirmInvalid,
      email, password, passwordConfirm, passwordsMatch, termsAgreed} = this.state;
    const {error, isLoading} = this.props;
    return (
      <Form onSubmit={this.handleSubmit} error={error !== null}>
        <Form.Input
          error ={emailInvalid && formSubmitted}
          value = {email}
          name = 'email'
          onChange = {this.handleInputChange}
          fluid label='Email'
          placeholder='Email' />
        <Form.Input
          error ={passwordInvalid && formSubmitted}
          value = {password}
          name ='password'
          onChange = {this.handleInputChange}
          type = 'password'
          fluid label='Password'
          placeholder='Password' />
        <Form.Input
          error ={(passwordConfirmInvalid || !passwordsMatch) && formSubmitted}
          value = {passwordConfirm}
          name ='passwordConfirm'
          onChange = {this.handleInputChange}
          type = 'password'
          fluid label='Confirm Password'
          placeholder='Confirm Password' />
        <Form.Checkbox
          error = {!termsAgreed && formSubmitted}
          name ='termsAgreed'
          checked = {termsAgreed}
          onChange = {this.handleCheckboxChange}
          label='I agree to the Terms and Conditions' />
        <Message error>
          <Icon name='warning'/>
          {this.errorMessage(error)}
        </Message>
        <Button type='submit' primary disabled={!this.validateForm()} loading={isLoading}>Create Account</Button>
      </Form>
    );
  }
}

Signup.propTypes = {
  doSignup : PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object
};
Signup.defaultProps = {};

export default Signup;
