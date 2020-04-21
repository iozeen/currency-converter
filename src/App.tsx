import React, { useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from './components/AppBar';
import { getCurrencies } from './actions/currencies';

const CurrencyConverter = lazy(() => import('./pages/CurrencyConverter'));
const Currencies = lazy(() => import('./pages/Currencies'));

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
        <Suspense fallback={<CircularProgress />}>
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
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
