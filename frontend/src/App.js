import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Welcome from './components/welcome/welcome';
import Welcome from './components/welcome/welcome';
import SignInForm from './components/session_form/sign_in_form';
import SignUpForm from './components/session_form/sign_up_form';

function App() {
  return (
  <div>
    <h1>Hello from App</h1>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/login" component={SignInForm} />
      <Route path="/signup" component={SignUpForm} />
    </Switch>
  </div>
  )
}

export default App;
