import { CURRENCIES } from '../actionTypes';
import { NormalizedCurrencies } from '../../helpers/types';

const getCurrencies = () => ({ type: CURRENCIES.GET_CURRENCIES });

const getCurrenciesSucccess = (result: NormalizedCurrencies) => ({
  type: CURRENCIES.GET_CURRENCIES_SUCCESS,
  payload: result,
});

const getCurrenciesError = () => ({ type: CURRENCIES.GET_CURRENCIES_ERROR });

const setBaseCurrency = (currency: string) => ({
  type: CURRENCIES.SET_BASE_CURRENCY,
  payload: currency,
});

const setFavorite = (key: string) => ({
  type: CURRENCIES.SET_FAVORITE,
  payload: key,
});

const setFavoriteSuccess = (key: string) => ({
  type: CURRENCIES.SET_FAVORITE_SUCCESS,
  payload: key,
});

const setFavoriteIds = (keys: string[]) => ({
  type: CURRENCIES.SET_FAVORITE_IDS,
  payload: keys,
});

export {
  getCurrencies,
  getCurrenciesSucccess,
  getCurrenciesError,
  setBaseCurrency,
  setFavorite,
  setFavoriteSuccess,
  setFavoriteIds,
};
