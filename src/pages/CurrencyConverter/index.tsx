import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import SwapVert from '@material-ui/icons/SwapVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IconButton } from '@material-ui/core';

import { StoreState } from '../../helpers/types';
import getFormattedRate from '../../helpers/getFormattedRate';
import CurrencyInput from '../../components/CurrencyInput';

export interface CurrencyConverterState {
  [key: string]: string | unknown
}

function CurrencyConverter() {
  const { currencies, baseCurrency, ids } = useSelector(({ currencies: currState }: StoreState) => currState);
  const [isSale, setIsSale] = useState(false);
  const [inputState, setInputState] = useState({ primary: '', secondary: '' } as CurrencyConverterState);
  const [state, setState] = useState({ primary: '', secondary: '' } as CurrencyConverterState);

  const saleKey = isSale ? 'sale' : 'buy';
  const getInvertedId = (stateObj: CurrencyConverterState, id: string): string => Object.keys(stateObj).filter((key) => key !== id)[0];

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSale(event.target.checked);
  };

  const handleSwap = () => {
    setState({ primary: state.secondary, secondary: state.primary });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const invertedId = getInvertedId(state, id);
    const statePrimary = state[id] as string;
    const stateSecondary = state[invertedId] as string;

    setInputState({
      [id]: value,
      [invertedId]: Number(value) ? getFormattedRate(
        Number(value) * (Number(currencies[saleKey][statePrimary]) / Number(currencies[saleKey][stateSecondary])),
      ) : '',
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<{ name?: string | undefined, value: unknown }>) => {
    const { name, value } = event.target;
    const invertedName = getInvertedId(state, name as string);
    if (state[invertedName] === value) {
      setState({ primary: state.secondary, secondary: state.primary });
    } else {
      setState({ ...state, [name as any]: value });
    }
  };

  useEffect(() => {
    if (!Object.values(state).includes('')) {
      const statePrimary = state.primary as string;
      const stateSecondary = state.secondary as string;

      setInputState({
        ...inputState,
        secondary: Number(inputState.primary) ? getFormattedRate(
          Number(inputState.primary) * (Number(currencies[saleKey][statePrimary]) / Number(currencies[saleKey][stateSecondary])),
        ) : '',
      });
    }
  }, [state, isSale]);

  useEffect(() => {
    setState({ primary: baseCurrency, secondary: ids.filter((id) => id !== baseCurrency)[0] });
  }, [ids, baseCurrency]);

  if (!baseCurrency) {
    return (
      <Grid container justify="center" alignItems="center" spacing={2} style={{ height: '20vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item>
        <FormControlLabel
          control={(
            <Switch
              checked={isSale}
              onChange={handleSwitchChange}
              color="primary"
            />
          )}
          label={isSale ? 'Sale' : 'Buy'}
        />
      </Grid>
      <Grid container justify="center">
        <CurrencyInput
          keyId="primary"
          inputState={inputState}
          state={state}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          ids={ids}
        />
        <Grid item>
          <IconButton onClick={handleSwap}>
            <SwapVert />
          </IconButton>
        </Grid>
        <CurrencyInput
          keyId="secondary"
          inputState={inputState}
          state={state}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          ids={ids}
        />
      </Grid>
    </Grid>
  );
}

export default CurrencyConverter;
