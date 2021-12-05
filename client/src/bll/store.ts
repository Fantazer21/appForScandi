import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {currencyReducer} from "./reducers/currency-reducer";
import {categoriesReducer} from "./reducers/categories-reducer";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  currencies: currencyReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

