import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';

import reducer from './reducers';
import middleware from './middleware';


import './css/index.css';
import App from './components/App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
//create store using the legacy method, newer configureStore method required slices to be configured
//we'll use mapStateToProps with Provider and legacy_createStore
const store = legacy_createStore(reducer, middleware);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);