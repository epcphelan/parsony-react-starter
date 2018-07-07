import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader'
import {user} from '../redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./views/Home";
import ThemingLayout from'../../libs/parsony/react/Theming';
import APIDocumentation from '../../libs/parsony/react/Documentation';

class App extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.store.dispatch;
  }
  componentDidMount(){
    this.dispatch(user.actions.loadValidSession())
  }
  render() {
    const state = this.props.store.getState();
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact path="/"
              render={(props) =>
                <Home
                  state={state}
                  dispatch={this.dispatch}
                />
              }/>
            <Route
              exact path="/theming"
              render={(props) =>
                <ThemingLayout/>
              }/>
            <Route
              path="/api*"
              render={(props) =>
                <APIDocumentation/>
              }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {store: PropTypes.object};

export default hot(module)(App);

