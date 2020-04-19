import { Currency, NormalizedCurrencies, UAH } from './types';

const getBaseCurrency = (result: Currency[], ccy: string): Currency | undefined => result.find((curr) => curr.ccy === ccy);

export default (result: Currency[]): NormalizedCurrencies => {
  const ids = result.map(({ ccy }) => ccy);
  const currencies = result
    .reduce((prev, curr) => {
      const {
        ccy, base_ccy, buy, sale,
      } = curr;

      const baseCurrency = getBaseCurrency(result, base_ccy);

      return ({
        buy: {
          ...prev.buy,
          [ccy]: !baseCurrency
            ? buy
            : `${Number(buy) * Number(baseCurrency.buy)}`,
        },
        sale: {
          ...prev.sale,
          [curr.ccy]: !baseCurrency
            ? sale
            : `${Number(sale) * Number(baseCurrency.sale)}`,
        },
      });
    },
    { buy: { [UAH]: '1' }, sale: { [UAH]: '1' } });

  return {
    currencies,
    ids,
  };
};
