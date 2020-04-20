import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { CurrencyConverterState } from '../../pages/CurrencyConverter';

interface CurrencyInputProps {
  keyId: string,
  inputState: CurrencyConverterState,
  state: CurrencyConverterState,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelectChange: (event: React.ChangeEvent<{ name?: string | undefined, value: unknown }>) => void,
  ids: string[]
}

function CurrencyInput({ keyId, inputState, state, handleInputChange, handleSelectChange, ids }: CurrencyInputProps) {
  return (
    <Grid item container spacing={1} alignItems="flex-end" justify="center">
      <Grid item>
        <TextField
          id={keyId}
          type="number"
          value={inputState[keyId]}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item>
        <Select
          value={state[keyId]}
          onChange={handleSelectChange}
          name={keyId}
        >
          {ids.map((id) => <MenuItem key={id} value={id}>{id}</MenuItem>)}
        </Select>
      </Grid>
    </Grid>
  );
}

export default CurrencyInput;
