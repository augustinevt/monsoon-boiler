import reducer from '../reducer';
import api from './../../../api';

describe('The thing Reducer', () => {
  it('should handle UPDATE_GOAL', () => {

    const initialState = {
      users: {
        loading: true,
        users: []
      }
    };

    const action = {
      type: "USER_FETCH_SUCCEEDED",
      payload: { users: [{ value: '34', id: '1' }, {value: '27', id: '2'}]}
    };

    const expected = {
      users: {
        loading: false,
        users: [{ value: '34', id: '1' }, {value: '27', id: '2'}],
      }
    };

    const result = reducer(initialState, action);

    expect(result).toEqual(expected);
  });
});
