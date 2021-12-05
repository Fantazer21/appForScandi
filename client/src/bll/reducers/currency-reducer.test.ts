import {currencyReducer, CurrenciesType, InitialStateType, setCurrenciesAC} from "./currency-reducer";

let startState: InitialStateType
beforeEach(() => {
  startState = {
    currencies: 'USD',
  }
})
test(('Currency reducer should work correctly'), () => {
  const action = setCurrenciesAC('GBP')
  const endState = currencyReducer(startState, action)

  expect(endState.currencies).toBe('GBP')
})
