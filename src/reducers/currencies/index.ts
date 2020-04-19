import { CURRENCIES } from '../../actions/actionTypes';
import { ActionShape, CurrencyState, UAH } from '../../helpers/types';

const initialState: CurrencyState = {
  currencies: { buy: { [UAH]: '1' }, sale: { [UAH]: '1' } },
  baseCurrency: UAH,
  ids: [UAH],
  favIds: [],
};

export default (state = initialState, action: ActionShape) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENCIES.GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: payload.currencies,
        ids: [...state.ids, ...payload.ids],
      };
    case CURRENCIES.SET_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: payload,
      };
    case CURRENCIES.SET_FAVORITE_SUCCESS: {
      const isIn = state.favIds.includes(payload);
      return {
        ...state,
        favIds: isIn
          ? state.favIds.filter((id) => id !== payload)
          : [...state.favIds, payload],
      };
    }
    case CURRENCIES.SET_FAVORITE_IDS:
      return {
        ...state,
        favIds: payload,
      };
    default:
      return state;
  }
};
