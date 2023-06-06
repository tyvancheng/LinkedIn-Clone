import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { useSelector } from'react-redux';
// import Welcome from './components/welcome/welcome';
import Welcome from './components/welcome/welcome';
import SignInForm from './components/session_form/sign_in_form';
import SignUpForm from './components/session_form/sign_up_form';
import Feed from './components/feed/feed';

function App() {

  const user = useSelector((state) => state.session.user);

  return (
  <div>
    <Switch>
      <Route exact path="/" >
          {user ? <Redirect to="/feed" /> : <Welcome />}
      </Route>
      
      <Route path="/login" >
          {user ? <Redirect to="/feed" /> : <SignInForm />}
      </Route>
      <Route path="/signup" >
          {user ? <Redirect to="/feed" /> : <SignUpForm />}
      </Route>
      <Route path="/feed" component={Feed} >
          {user ? <Feed /> : <Redirect to="/" />}
          </Route>
    
    </Switch>
  </div>
  )
}

export default App;
