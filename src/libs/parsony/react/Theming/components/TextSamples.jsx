import React from 'react'
import {
  Grid,
  Header,
} from 'semantic-ui-react'

const TextSamples = () => (
  <Grid columns={3} stackable>
    <Grid.Column>
      <Header as='h1'>Heading 1</Header>
      <Header as='h2'>Heading 2</Header>
      <Header as='h3'>Heading 3</Header>
      <Header as='h4'>Heading 4</Header>
      <Header as='h5'>Heading 5</Header>

      <p>
        Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies
        vehicula.
      </p>
    </Grid.Column>

    <Grid.Column>
      <Header as='h2'>Example body text</Header>

      <p>
        Nullam quis risus eget <a href='#'>urna mollis ornare</a> vel eu leo. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh
        ultricies vehicula.
      </p>
      <p>
        <small>This line of text is meant to be treated as fine print.</small>
      </p>
      <p>
        The following snippet of text is <strong>rendered as bold text</strong>.
      </p>
      <p>
        The following snippet of text is <em>rendered as italicized text</em>.
      </p>
      <p>
        An abbreviation of the word attribute is <abbr title='attribute'>attr</abbr>.
      </p>
    </Grid.Column>

    <Grid.Column>
      <Grid
        centered
        columns={3}
        padded
        stackable
        style={{ margin: '-1.5em', width: 400 }}
        textAlign='center'
      >
        <Grid.Column color='red' style={{ margin: '0.5em', height: 50 }}>
          Red
        </Grid.Column>
        <Grid.Column color='orange' style={{ margin: '0.5em', height: 50 }}>
          Orange
        </Grid.Column>
        <Grid.Column color='yellow' style={{ margin: '0.5em', height: 50 }}>
          Yellow
        </Grid.Column>
        <Grid.Column color='olive' style={{ margin: '0.5em', height: 50 }}>
          Olive
        </Grid.Column>
        <Grid.Column color='green' style={{ margin: '0.5em', height: 50 }}>
          Green
        </Grid.Column>
        <Grid.Column color='teal' style={{ margin: '0.5em', height: 50 }}>
          Teal
        </Grid.Column>
        <Grid.Column color='blue' style={{ margin: '0.5em', height: 50 }}>
          Blue
        </Grid.Column>
        <Grid.Column color='violet' style={{ margin: '0.5em', height: 50 }}>
          Violet
        </Grid.Column>
        <Grid.Column color='purple' style={{ margin: '0.5em', height: 50 }}>
          Purple
        </Grid.Column>
        <Grid.Column color='pink' style={{ margin: '0.5em', height: 50 }}>
          Pink
        </Grid.Column>
        <Grid.Column color='brown' style={{ margin: '0.5em', height: 50 }}>
          Brown
        </Grid.Column>
        <Grid.Column color='grey' style={{ margin: '0.5em', height: 50 }}>
          Grey
        </Grid.Column>
        <Grid.Column color='black' style={{ margin: '0.5em', height: 50 }}>
          Black
        </Grid.Column>
      </Grid>
    </Grid.Column>
  </Grid>
);

export default TextSamples;