import getCurrencyByLanguage from './getCurrencyByLanguage';

it('returns correct currency', () => {
  expect(getCurrencyByLanguage('uk')).toEqual('UAH');
  expect(getCurrencyByLanguage('en-US')).toEqual('USD');
  expect(getCurrencyByLanguage(undefined)).toEqual('EUR');
});
