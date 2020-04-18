import { call, put, takeEvery } from 'redux-saga/effects';
import { CURRENCIES } from '../../actions/actionTypes'

function* fetchCurrenciesWorker() {
  try {
    const response = yield call(fetch, 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    if (response.status !== 200) {
      throw new Error('Error fetching currency data');
    }
    const result = yield call([response, 'json']);
    yield put({ type: CURRENCIES.GET_CURRENCIES_SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: CURRENCIES.GET_CURRENCIES_ERROR });
  }
}

export default function* currenciesWatcher() {
  yield takeEvery(CURRENCIES.GET_CURRENCIES, fetchCurrenciesWorker)
}