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
});

function CurrenciesTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    currencies, baseCurrency, ids, favIds,
  } = useSelector(({ currencies: state }: StoreState) => state);

  const handleClick = (key: string) => () => dispatch(setFavorite(key));

  const list = [...favIds, ...ids.filter((id) => !favIds.includes(id))];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currencies</TableCell>
            <TableCell align="right">Buy</TableCell>
            <TableCell align="right">Sale</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {ids.length > 1 ? list.map((key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">{getFormattedRate(currencies.buy[key], currencies.buy[baseCurrency])}</TableCell>
              <TableCell align="right">{getFormattedRate(currencies.sale[key], currencies.sale[baseCurrency])}</TableCell>
              <TableCell align="right">
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
