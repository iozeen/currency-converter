import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBar, { tabsList } from './index';

describe('AppBar', () => {
  const component = <Router><AppBar /></Router>;

  it('renders', () => {
    shallow(component);
  });

  it('renders each tab', () => {
    const wrapper = mount(component);

    expect(wrapper.find('a')).toHaveLength(tabsList.length);
  });
});
