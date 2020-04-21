import normalizeCurrencies from './normalizeCurrencies';

const mockArray = [
  {
    ccy: 'USD',
    base_ccy: 'UAH',
    buy: '26.90000',
    sale: '27.35000',
  },
  {
    ccy: 'EUR',
    base_ccy: 'UAH',
    buy: '29.00000',
    sale: '29.60000',
  },
  {
    ccy: 'RUR',
    base_ccy: 'UAH',
    buy: '0.32000',
    sale: '0.36000',
  },
  {
    ccy: 'BTC',
    base_ccy: 'USD',
    buy: '6500',
    sale: '7200',
  },
];

it('returns normalized object', () => {
  expect(normalizeCurrencies(mockArray)).toEqual({
    currencies: {
      buy: { UAH: '1', USD: '26.90000', EUR: '29.00000', RUR: '0.32000', BTC: '174850' },
      sale: { UAH: '1', USD: '27.35000', EUR: '29.60000', RUR: '0.36000', BTC: '196920' },
    },
    ids: ['USD', 'EUR', 'RUR', 'BTC'],
  });
});
