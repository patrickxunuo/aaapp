import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import 'antd/dist/antd.css'
import {Provider as ReduxProvider} from 'react-redux'
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import reducers from './redux/reducers'

const devStage = true

// store, compatible with thunk, redux devtools
const reduxStore = createStore(
  reducers,
  devStage ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
)


ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);
