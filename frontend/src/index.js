import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './App';
import { Provider as ReduxProvider} from 'react-redux';
import { BrowserRouter } from'react-router-dom';
import configureStore from './store';
import {csrfFetch} from './store/csrf';
import * as sessionActions from './store/session'; 


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}


function Root() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  );
}

const initializeApp = () => {
  ReactDOM.render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
      document.getElementById('root')
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null) {
    store.dispatch(sessionActions.restoreSession()).then(initializeApp)
} else {
    initializeApp();
}