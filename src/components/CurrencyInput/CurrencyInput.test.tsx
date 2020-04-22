import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Select, TextField, MenuItem } from '@material-ui/core';
import CurrencyInput from './index';
import { CurrencyConverterState } from '../../pages/CurrencyConverter';

describe('CurrencyInput', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let keyId;
  let inputState;
  let state: CurrencyConverterState;
  let handleInputChange;
  let handleSelectChange: jest.Mock<any, any>;
  let ids;
  beforeEach(() => {
    keyId = 'primary';
    inputState = { primary: '123', secondary: '' };
    state = { primary: 'UAH', secondary: '' };
    handleInputChange = jest.fn();
    handleSelectChange = jest.fn();
    ids = ['UAH', 'USD', 'EUR', 'RUR', 'BTC'];
    wrapper = mount(
      <CurrencyInput
        keyId={keyId}
        inputState={inputState}
        state={state}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        ids={ids}
      />,
    );
  });

  it('renders input with correct value', () => {
    expect(wrapper.find(TextField).props().value).toEqual('123');
  });

  it('renders select with correct option value', () => {
    expect(wrapper.find(Select).props().value).toEqual('UAH');
  });

  it('renders dropdown list and triggers onChange', () => {
    wrapper.find('[role="button"]').simulate('mousedown', { button: 0 });
    expect(wrapper.find(MenuItem)).toHaveLength(ids.length);

    const selectedItem = wrapper.find('li').at(3);
    selectedItem.simulate('click');
    expect(handleSelectChange).toBeCalled();
  });
});
