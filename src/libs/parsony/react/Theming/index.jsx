import React from 'react'
import {
  Container,
  Header,
  Grid,
  Divider
} from 'semantic-ui-react'

import FixedMenu from './components/FixedMenu';
import TextSamples from './components/TextSamples';
import Menus from './components/Menus';
import Buttons from './components/Buttons';
import Forms from './components/Forms'
import FeedBasic from './components/FeedBasic';
import CardExample from './components/CardExample';
import TableExamplePadded from './components/TableExamplePadded';
import Modals from './components/Modals';

const ThemingLayout = () => (
  <div>
    <FixedMenu/>
    <Container style={{ marginTop: '7em', marginBottom:'10em' }}>

      <Header as='h1'>Theming Examples</Header>

      <Header as='h2' dividing>Site</Header>

      <TextSamples/>

      <Header as='h2' dividing>Menu</Header>

      <Menus/>

      <Header as='h2' dividing>Buttons</Header>

      <Buttons/>

      <Header as='h2' dividing>Feeds & Threads</Header>
      <Grid columns={2}>
        <Grid.Column>
          <FeedBasic/>
        </Grid.Column>
        <Grid.Column>
          <CardExample/>
        </Grid.Column>
      </Grid>
      <Header as='h2' dividing>Forms </Header>
      <Forms/>
      <Header as='h2' dividing > Table </Header>
      <TableExamplePadded/>
      <Header as='h2' dividing > Modals </Header>
      <Modals/>
    </Container>
  </div>
);

export default ThemingLayout