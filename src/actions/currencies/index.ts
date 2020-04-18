import { CURRENCIES } from "../actionTypes";

const getCurrencies = () => ({
  type: CURRENCIES.GET_CURRENCIES
});

export {
  getCurrencies
}