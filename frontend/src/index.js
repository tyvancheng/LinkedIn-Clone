import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as ReduxProvider} from 'react-redux';
import { BrowserRouter } from'react-router-dom';
import { restoreSession } from './store/csrf';
import configureStore from './store';
import { createUser, loginUser, logoutUser } from './store/usersReducer'; 

window.createUser = createUser
window.loginUser = loginUser
window.logoutUser = logoutUser

const store = configureStore();

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

restoreSession().then(initializeApp)

let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
let initialState = {};

if (currentUser) {
    initialState = {
        users: {
        [currentUser.id]: currentUser
        }
    };
};