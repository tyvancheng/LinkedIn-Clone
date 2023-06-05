import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { useSelector } from'react-redux';
// import Welcome from './components/welcome/welcome';
import Welcome from './components/welcome/welcome';
import SignInForm from './components/session_form/sign_in_form';
import SignUpForm from './components/session_form/sign_up_form';
import Feed from './components/feed/feed';

function App() {

  // const user = useSelector((state) => state.session.user);

  return (
  <div>
    <Switch>
      <Route exact path="/" component={Welcome}/>
        {/* {user.id !== null ? <Redirect to={`/feed/${user.id}`} /> : <Welcome />} */}
      {/* </Route> */}
      <Route path="/login" component={SignInForm} />
      <Route path="/signup" component={SignUpForm} />
      <Route path={`/feed`} component={Feed} />
      {/* fix  */}
    </Switch>
  </div>
  )
}

export default App;
