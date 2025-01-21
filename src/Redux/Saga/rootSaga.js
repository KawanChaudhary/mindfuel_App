import {all} from 'redux-saga/effects';
import storySagas from './storySagas';

export default function* rootSaga() {
  yield all([storySagas()]);
}
