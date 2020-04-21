import { all } from 'redux-saga/effects';
import currenciesWatcher from './currencies';

export default function* rootSaga() {
  yield all([
    currenciesWatcher(),
  ]);
}
