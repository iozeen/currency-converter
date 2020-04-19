export interface Currency {
  ccy: string
  base_ccy: string
  buy: string
  sale: string
}

export interface NormalizedCurrencies {
  currencies: {[key: string]: {[innerKey: string]: string}}
  ids: string[]
}

export interface ActionShape {
  type: string
  payload?: any
}

export interface CurrencyState {
  currencies: {[key: string]: {[innerKey: string]: string}}
  baseCurrency: string
  ids: string[]
  favIds: string[]
}

export interface StoreState {
  currencies: CurrencyState
}

export const UAH = 'UAH';
