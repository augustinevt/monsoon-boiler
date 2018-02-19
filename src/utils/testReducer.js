import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

const main = (state = {loading: true, users: []}, action) => {
  switch (action.type) {
    case "STORE_TEST_ACTION":
      const { actionLog } = state;

      return {...state, latestAction: action};
    default:
      return state;
  }
};


export default main;
