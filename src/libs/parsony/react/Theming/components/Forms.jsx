import React from 'react'
import {
  Grid,
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Divider,
  Input,
  Dropdown
} from 'semantic-ui-react'


const webOptions = [
  { key: '.com', text: '.com', value: '.com' },
  { key: '.net', text: '.net', value: '.net' },
  { key: '.org', text: '.org', value: '.org' },
];

const InputExampleRightLabeled = () => (
  <Input
    label={<Dropdown defaultValue='.com' options={webOptions} />}
    labelPosition='right'
    placeholder='Find domain'
  />
);

const genders = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

const FormExampleFieldError = () => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Input fluid label='First name' placeholder='First name' error width='8'/>
      <Form.Input fluid label='Last name' placeholder='Last name' width='8'/>
    </Form.Group>
    <Form.Select options={genders} placeholder='Gender' error />
    <Form.Checkbox label='I agree to the Terms and Conditions' error />
  </Form>
);

const InputExampleLeftActionLabeledButton = () => (
  <Input
    action={{ color: 'teal', labelPosition: 'left', icon: 'cart', content: 'Checkout' }}
    actionPosition='left'
    placeholder='Search...'
    defaultValue='52.03'
  />
)


const MessageFormAttached = () => (
  <div>
    <Message
      attached
      header='Welcome to our site!'
      content='Fill out the form below to sign-up for a new account'
    />
    <Form className='attached fluid segment'>
      <Form.Group widths='equal'>
        <Form.Input fluid label='First Name' placeholder='First Name' type='text' width='8'/>
        <Form.Input fluid label='Last Name' placeholder='Last Name' type='text' width='8'/>
      </Form.Group>
      <Form.Input label='Username' placeholder='Username' type='text' />
      <Form.Input label='Password' type='password' />
      <Form.Checkbox inline label='I agree to the terms and conditions' />
      <Button color='blue'>Submit</Button>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help' />
      Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
    </Message>
  </div>
);


const FormExampleInverted = () => (
  <Segment inverted>
    <Form inverted>
      <Form.Group widths='equal'>
        <Form.Input fluid label='First name' placeholder='First name' width='8'/>
        <Form.Input fluid label='Last name' placeholder='Last name' width='8'/>
      </Form.Group>
      <Form.Checkbox label='I agree to the Terms and Conditions' />
      <Button type='submit'>Submit</Button>
    </Form>
  </Segment>
);


const Forms = () => (
  <Grid columns={2} doubling>
    <Grid.Column>
      <MessageFormAttached/>
    </Grid.Column>

    <Grid.Column>
      <FormExampleFieldError/>
      <Divider/>
      <Grid columns={2}>
        <Grid.Column>
          <InputExampleRightLabeled/>
        </Grid.Column>
        <Grid.Column>
          <InputExampleLeftActionLabeledButton/>
        </Grid.Column>
      </Grid>
      <Divider/>
      <FormExampleInverted/>
    </Grid.Column>

  </Grid>
);

export default Forms;