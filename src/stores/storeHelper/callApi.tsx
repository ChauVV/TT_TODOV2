import {call} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';

export function* callApi(api, params) {
  const res = yield NetInfo.fetch();
  if (res.isConnected) {
    return yield call(api, params);
  } else {
    throw {data: {code: 'NETWORK_REQUEST_FAILED'}};
  }
}
