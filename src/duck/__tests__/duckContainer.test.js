import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import createStore, { log } from '../test-store.js';
import DuckContainer from '../containers/DuckContainer';

const mockApiData = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    }
  }
];

jest.mock('./../../api', () => {
  return () => ({ body: mockApiData });
});

describe('The', () => {

  test('duck', async () => {

    const store = createStore();
    const wrapper = await mount(
      <Provider store={store} dispatch={store.dispatch}>
        <DuckContainer/>
      </Provider>
    );

    // check the logs
    expect(log.shift()).toEqual({type: "USER_FETCH_REQUESTED", payload: {}});
    // check the state
    expect(store.getState().users.users[0]).toEqual(mockApiData[0]);
    // check the UI
    expect(wrapper.find('.card').length).toEqual(1);
  });
});

// This test needs to be fixed for full integration
