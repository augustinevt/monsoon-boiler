import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from './../../api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchUser(action) {
  try {
    const users = yield call(api, 'fake_data', {txnId: 3});
    // console.log(users)
    yield put({type: "USER_FETCH_SUCCEEDED", payload: {users: users.body}});
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
