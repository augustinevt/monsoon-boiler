import React from 'react';
import { shallow, mount } from 'enzyme';
jest.mock('./../../../api', () => {
  return () => ({ body: []});
});

import { DuckContainer } from '../DuckContainer';

xdescribe('The', () => {
  test('duck', () => {
    const wrapper = mount(<DuckContainer dispatch={jest.fn()} users={{loading: false, users: []}}/>);

    const thing = wrapper.find('div');
    expect(wrapper.find('div')).toHaveLength(3);
  });
});
