import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { useSelector } from'react-redux';
// import Welcome from './components/welcome/welcome';
import Welcome from './components/welcome/welcome';
import SignInForm from './components/session_form/sign_in_form';
import SignUpForm from './components/session_form/sign_up_form';
import { NameInput } from './components/session_form/name_input';

function App() {

  const user = useSelector((state) => state.session.user);

  return (
  <div>
    <Switch>
      <Route exact path="/">
        {user.id !== null ? <Redirect to={`/feed/${user.id}`} /> : <Welcome />}
      </Route>
      <Route path="/login" component={SignInForm} />
      <Route path="/signup" component={SignUpForm} />
      <Route path="/nameinput" component={NameInput} />
      <Route path={`/feed/${user.id}`} component={Welcome} />
      {/* fix  */}
    </Switch>
  </div>
  )
}

export default App;
