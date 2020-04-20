import { call, put, takeEvery, select } from 'redux-saga/effects';
import { CURRENCIES } from '../../actions/actionTypes';
import normalizeCurrencies from '../../helpers/normalizeCurrencies';
import { getCurrenciesSucccess, getCurrenciesError, setFavoriteSuccess, setFavoriteIds, setBaseCurrency } from '../../actions/currencies';
import { StoreState, ActionShape } from '../../helpers/types';
import getCurrencyByLanguage from '../../helpers/getCurrencyByLanguage';

export const fetchCurrencies = (): Promise<Response> => fetch(process.env.REACT_APP_API as string);

function* fetchCurrenciesWorker(): Generator<any, void, any> {
  const favIds = JSON.parse(localStorage.getItem('favIds') as string);
  const { language = 'uk' } = window.navigator;

  if (favIds) {
    yield put(setFavoriteIds(favIds));
  }

  try {
    const response = yield call(fetchCurrencies);
    if (response.status !== 200) {
      throw new Error('Error fetching currency data');
    }
    const result = normalizeCurrencies(yield response.json());

    yield put(getCurrenciesSucccess(result));
    yield put(setBaseCurrency(getCurrencyByLanguage(language)));
  } catch (error) {
    yield put(getCurrenciesError());
  }
}

function* setFavoriteWorker({ payload }: ActionShape): Generator<any, void, any> {
  const getFavIds = ({ currencies }: StoreState) => currencies.favIds;

  yield put(setFavoriteSuccess(payload));
  const favIds = yield select(getFavIds);

  if (!favIds.length) {
    localStorage.removeItem('favIds');
  } else {
    localStorage.setItem('favIds', JSON.stringify(favIds));
  }
}

export default function* currenciesWatcher() {
  yield takeEvery(CURRENCIES.GET_CURRENCIES, fetchCurrenciesWorker);
  yield takeEvery(CURRENCIES.SET_FAVORITE, setFavoriteWorker);
}
