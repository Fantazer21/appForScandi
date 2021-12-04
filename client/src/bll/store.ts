import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { currencyReducer } from "./reducers/currency-reducer";

const rootReducer = combineReducers({
  currentCurrency: currencyReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>