import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import App from './react/App.jsx';
import {reducer} from './redux';
import 'semantic-ui-less/semantic.less';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
  reducer, {}, window.devToolsExtension ? window.devToolsExtension() : f => f);

function render() {
  return ReactDOM.render(<App store={store}/>, document.getElementById('react-root'));
}

store.subscribe(render);

render();

if (module.hot) {
  module.hot.accept()
}