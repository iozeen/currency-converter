import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBar, { tabsList } from './index';

describe('AppBar', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  beforeEach(() => {
    wrapper = mount(<Router><AppBar /></Router>);
  });

  it('renders each tab', () => {
    expect(wrapper.find('a')).toHaveLength(tabsList.length);
    wrapper.find('a').at(0).simulate('click');
    expect(wrapper.find('a').at(0).getDOMNode().getAttribute('aria-selected')).toBe('true');
  });
});
