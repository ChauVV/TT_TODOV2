import {all, fork} from 'redux-saga/effects';

import todoSaga from 'store/saga/todoSaga';

export default function* rootSaga() {
  yield all([fork(todoSaga)]);
}
