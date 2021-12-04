export type InitialStateType = {
  currentCurrency: currentCurrencyType
}
export type currentCurrencyType = 'USD' |'GBP' | 'AUD' |'JPY' |'RUB'

export const initialState: InitialStateType = {
  currentCurrency: 'USD',
}

export const currencyReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'set-currency':
      return {...state, currentCurrency: action.currency}
    default :
      return state
  }
}

//actions
export const setCurrencyAC = (currency: currentCurrencyType) => ({type: 'set-currency', currency} as const)
type SetCurrencyACType = ReturnType<typeof setCurrencyAC>
//thunks


type ActionsType = SetCurrencyACType