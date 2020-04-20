import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import CurrencyConverter from './pages/CurrencyConverter';
import Currencies from './pages/Currencies';
import AppBar from './components/AppBar';
import { getCurrencies } from './actions/currencies';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  return (
    <Router>
      <AppBar />
      <div className={classes.container}>
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
