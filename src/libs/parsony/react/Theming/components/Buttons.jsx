import React from 'react'
import {
  Header,
  Grid,
  Button,
  Icon,
  Segment,
  Divider
} from 'semantic-ui-react'

const ButtonExampleEmphasis = () => (
  <div>
    <Header as ='h4'> Standard | Emphasis</Header>
    <p> Formatted to show different levels of emphasis.</p>
    <Button> Basic Button </Button>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
  </div>
);

const ButtonExampleAnimated = () => (
  <div>
    <Header as ='h4'> Animated</Header>
    <p>Animated to show additional or hidden content. </p>
    <Button animated>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    <Button animated='vertical'>
      <Button.Content hidden>Shop</Button.Content>
      <Button.Content visible>
        <Icon name='shop' />
      </Button.Content>
    </Button>
    <Button animated='fade'>
      <Button.Content visible>Sign-up for a Pro account</Button.Content>
      <Button.Content hidden>$12.99 a month</Button.Content>
    </Button>
  </div>
);

const ButtonExampleLabeledIcon = () => (
  <div>
    <Header as ='h4'>Labeled Icon</Header>
    <p>A button can use an icon as a label.</p>
    <Button icon labelPosition='left'>
      <Icon name='pause' />
      Pause
    </Button>
    <Button icon labelPosition='right'>
      Next
      <Icon name='right arrow' />
    </Button>
  </div>
);


const ButtonExampleGroupIcon = () => (
  <div>
    <Header as ='h4'>Icon Group</Header>
    <p>Button groups can show groups of icons.</p>
    <Button.Group>
      <Button icon>
        <Icon name='align left' />
      </Button>
      <Button icon>
        <Icon name='align center' />
      </Button>
      <Button icon>
        <Icon name='align right' />
      </Button>
      <Button icon>
        <Icon name='align justify' />
      </Button>
    </Button.Group>{' '}
    <Button.Group>
      <Button icon>
        <Icon name='bold' />
      </Button>
      <Button icon>
        <Icon name='underline' />
      </Button>
      <Button icon>
        <Icon name='text width' />
      </Button>
    </Button.Group>
  </div>
);

const ButtonExampleConditionals = () => (
  <div>
    <Header as ='h4'>Conditionals</Header>
    <p>Button groups can contain conditionals.</p>
    <Button.Group>
      <Button>Cancel</Button>
      <Button.Or />
      <Button positive>Save</Button>
    </Button.Group>
  </div>
);


const ButtonExampleCircularSocial = () => (
  <div>
    <Header as ='h4'>Circular</Header>
    <p>A button can be circular.</p>
    <Button circular color='facebook' icon='facebook' />
    <Button circular color='twitter' icon='twitter' />
    <Button circular color='linkedin' icon='linkedin' />
    <Button circular color='google plus' icon='google plus' />
  </div>
);

const Buttons = () => (
  <Grid columns={3} doubling>
    <Grid.Column>
      <ButtonExampleEmphasis/>
      <Divider/>
    </Grid.Column>
    <Grid.Column>
      <ButtonExampleAnimated/>
      <Divider/>
      <ButtonExampleConditionals/>
    </Grid.Column>
    <Grid.Column>
      <ButtonExampleLabeledIcon/>
      <Divider/>
      <ButtonExampleGroupIcon/>
      <Divider/>
      <ButtonExampleCircularSocial/>
    </Grid.Column>
  </Grid>
);

export default Buttons;