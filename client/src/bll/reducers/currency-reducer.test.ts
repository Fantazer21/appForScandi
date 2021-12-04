import {currencyReducer, currentCurrencyType, InitialStateType, setCurrencyAC} from "./currency-reducer";

let startState: InitialStateType
beforeEach(() => {
  startState = {
    currentCurrency: 'USD',
  }
})
test(('Currency reducer should work correctly'), () => {
  const action = setCurrencyAC('GBP')
  const endState = currencyReducer(startState, action)

  expect(endState.currentCurrency).toBe('GBP')
})
