import {Dispatch} from "redux";
import {query, request} from "../../dal/apiRequest";
import {Query} from "@tilework/opus";
export type  CurrenciesNamesTypes = 'USD' | 'GBP' | 'AUD' | 'JPY' | 'RUB'

type InitialStateType = {
  currencies: CurrenciesArrayType
  currentCurrency: CurrenciesNamesTypes
}
export type CurrenciesArrayType = Array<CurrenciesNamesTypes>

const initialState: InitialStateType = {
  currencies: [],
  currentCurrency: 'USD',
}

export const currencyReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'set-currencies':
      return {...state, currencies: action.currency}
    case 'set-current-currency':
      console.log(state.currentCurrency)
      return {...state, currentCurrency: action.currentCurrency}
    default :
      return state
  }
}

//actions
export const setCurrenciesAC = (currency: CurrenciesArrayType) => ({type: 'set-currencies', currency} as const)
type SetCurrencyACType = ReturnType<typeof setCurrenciesAC>

export const setCurrentCurrencyAC = (currentCurrency: CurrenciesNamesTypes) => ({type: 'set-current-currency', currentCurrency} as const)
type SetCurrentCurrencyACType = ReturnType<typeof setCurrentCurrencyAC>

type ActionsType = SetCurrencyACType | SetCurrentCurrencyACType

//thunks

export const setCurrenciesThunkCreator = () => (dispatch: Dispatch) => {

  const currenciesData = query(new Query(request.getCurrencies))
  currenciesData.then(
    (res: any) => { //Add type later
      dispatch(setCurrenciesAC(res.currencies))
    }
  )
}


