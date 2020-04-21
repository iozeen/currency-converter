import getFormattedRate from './getFormattedRate';

it('returns formatted number with at least 4 digits after comma', () => {
  expect(getFormattedRate(1)).toEqual('1.0000');
  expect(getFormattedRate(1.12345)).toEqual('1.1235');
  expect(getFormattedRate(0.00000004)).toEqual('0.00000004');
  expect(getFormattedRate(NaN)).toEqual('0.0000');
});
