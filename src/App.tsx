import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import CurrencyConverter from './pages/CurrencyConverter';
import Currencies from './pages/Currencies';
import AppBar from './components/AppBar';
import { getCurrencies } from './actions/currencies';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

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
