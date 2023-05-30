import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Welcome from './components/welcome/welcome';

function App() {
  <div>
    <h1>Hello from App</h1>
    <Switch>
      <Route exact path="/" component={Welcome} />
    </Switch>
  </div>

}

export default App;
