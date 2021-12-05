import {Dispatch} from "redux";
import {query, request} from "../../dal/apiRequest";
import {Query} from "@tilework/opus";
import {setCategoriesAC} from "./categories-reducer";

type InitialStateType = {
  currencies: CurrenciesType
}
type CurrenciesType = Array<'USD' | 'GBP' | 'AUD' | 'JPY' | 'RUB'>

const initialState: InitialStateType = {
  currencies: [],
}

export const currencyReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'set-currencies':
      return {...state, currencies: action.currency}
    default :
      return state
  }
}

//actions
export const setCurrenciesAC = (currency: CurrenciesType) => ({type: 'set-currencies', currency} as const)
type SetCurrencyACType = ReturnType<typeof setCurrenciesAC>

//thunks

export const setCurrenciesThunkCreator = () => (dispatch: Dispatch) => {

  const currenciesData = query(new Query(request.getCurrencies))
  currenciesData.then(
    (res: any) => { //Add type later
      console.log('Data currencies', res.currencies)
      dispatch(setCurrenciesAC(res.currencies))
    }
  )
}


type ActionsType = SetCurrencyACType