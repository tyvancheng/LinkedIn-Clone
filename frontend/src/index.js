import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './App';
import { Provider as ReduxProvider} from 'react-redux';
import { BrowserRouter } from'react-router-dom';
import configureStore from './store';
import * as sessionActions from './store/session'; 


window.createUser = sessionActions.createUser
window.loginUser = sessionActions.loginUser
window.logoutUser = sessionActions.logoutUser


const store = configureStore();

window.store = store

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

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUserId") === null) {
    store.dispatch(sessionActions.restoreSession()).then(initializeApp)
} else {
    initializeApp();
}