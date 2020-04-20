import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { Typography } from '@material-ui/core';
import { StoreState } from '../../helpers/types';
import { setBaseCurrency } from '../../actions/currencies';

import CurrenciesTable from '../../components/CurrenciesTable';

const useStyles = makeStyles({
  tableRoot: {
    width: '100%',
    overflowX: 'auto',
  },
});

function Currencies() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { baseCurrency, ids } = useSelector(({ currencies: state }: StoreState) => state);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setBaseCurrency(event.target.value as string));
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item container alignItems="baseline" spacing={2}>
        <Grid item>
          <Typography>Base currency:</Typography>
        </Grid>
        <Grid item>
          <Select
            value={baseCurrency}
            onChange={handleChange}
          >
            {ids.map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)}
          </Select>
        </Grid>
      </Grid>
      <Grid item className={classes.tableRoot}>
        <CurrenciesTable />
      </Grid>
    </Grid>
  );
}

export default Currencies;
