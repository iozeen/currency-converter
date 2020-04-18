import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';

import CurrencyConverter from './pages/CurrencyConverter';
import Currencies from './pages/Currencies';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <NavLink to="/">Currency converter</NavLink>
          <NavLink to="/currencies">Currencies</NavLink>
        </nav>
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
