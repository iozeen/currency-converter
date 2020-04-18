import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import CurrencyConverter from './pages/CurrencyConverter';
import Currencies from './pages/Currencies';
import AppBar from './components/AppBar';

function App() {
  return (
    <Router>
      <div>
        <AppBar />
        <Switch>
          <Route exact path="/">
            <CurrencyConverter />
          </Route>
          <Route path="/currencies">
            <Currencies />
          </Route>
          <Route path="*">
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
