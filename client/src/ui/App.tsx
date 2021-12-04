import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import {currentCurrencyType, InitialStateType, setCurrencyAC} from "../bll/reducers/currency-reducer";
import {AppRootStateType} from "../bll/store";

type AppPropsType = MapStateType & MapDispatchType

class App extends React.PureComponent<AppPropsType> {
  constructor(props: AppPropsType) {
      super(props)
  }

  render() {
    const  {
      currentCurrency
    } = this.props

    return (
      <div>
        {currentCurrency}
      </div>
    )
  }
}
type MapStateType = InitialStateType

const mapState = (state: AppRootStateType): MapStateType =>({
  currentCurrency: state.currentCurrency.currentCurrency
})
type MapDispatchType = {
  setCurrencyAC: (currency: currentCurrencyType) => void
}

const mapDispatch = {
  setCurrencyAC
}

export default connect(mapState, mapDispatch)(App);


