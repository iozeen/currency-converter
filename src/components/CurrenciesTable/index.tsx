import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FavIcon from '@material-ui/icons/Favorite';
import FavIconBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import { StoreState } from '../../helpers/types';
import getFormattedRate from '../../helpers/getFormattedRate';
import { setFavorite } from '../../actions/currencies';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  colWidth: {
    width: '30%',
  },
});

function CurrenciesTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    currencies, baseCurrency, ids, favIds,
  } = useSelector(({ currencies: state }: StoreState) => state);

  const handleClick = (key: string) => () => dispatch(setFavorite(key));

  const list = [...favIds, ...ids.filter((id) => !favIds.includes(id))];
  const getRate = (key: string, trade: string): number => Number(currencies[trade][key]) / Number(currencies[trade][baseCurrency]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.colWidth}>Currencies</TableCell>
            <TableCell className={classes.colWidth}>Buy</TableCell>
            <TableCell className={classes.colWidth}>Sale</TableCell>
            <TableCell size="small" />
          </TableRow>
        </TableHead>
        <TableBody>
          {baseCurrency && ids.length > 1 ? list.map((key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row" className={classes.colWidth}>
                {key}
              </TableCell>
              <TableCell className={classes.colWidth}>{getFormattedRate(getRate(key, 'buy'))}</TableCell>
              <TableCell className={classes.colWidth}>{getFormattedRate(getRate(key, 'sale'))}</TableCell>
              <TableCell size="small">
                <IconButton onClick={handleClick(key)}>
                  {favIds.includes(key) ? <FavIcon /> : <FavIconBorder />}
                </IconButton>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrenciesTable;
