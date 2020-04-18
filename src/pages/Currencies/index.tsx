import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCurrencies } from '../../actions/currencies';

function Currencies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrencies());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>Currency</div>
  );
}

export default Currencies;
