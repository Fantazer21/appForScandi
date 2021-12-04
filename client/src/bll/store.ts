import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { testReducer } from "./reducers/test-reducer";

const rootReducer = combineReducers({
  test: testReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>