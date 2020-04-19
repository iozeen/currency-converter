import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { StoreState } from '../../helpers/types';
import { setBaseCurrency } from '../../actions/currencies';

import CurrenciesTable from '../../components/CurrenciesTable';

function Currencies() {
  const dispatch = useDispatch();
  const { baseCurrency, ids } = useSelector(({ currencies: state }: StoreState) => state);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setBaseCurrency(event.target.value as string));
  };

  return (
    <div>
      <Select
        value={baseCurrency}
        onChange={handleChange}
      >
        {ids.map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)}
      </Select>
      <CurrenciesTable />
    </div>
  );
}

export default Currencies;
