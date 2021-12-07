import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import {setCurrenciesThunkCreator} from "../bll/reducers/currency-reducer";
import {AppRootStateType} from "../bll/store";
import {Header} from "./Header/Header";
import {setCategoriesThunkCreator} from "../bll/reducers/categories-reducer";

type AppPropsType = MapStateType & MapDispatchType

class App extends React.PureComponent<AppPropsType> {
  constructor(props: AppPropsType) {
    super(props)
  }

  componentDidMount() {
    this.props.setCategoriesThunkCreator()
    this.props.setCurrenciesThunkCreator()
  }

  render() {
    const {
      categories, currencies
    } = this.props

    return (
      <>
        <Header categories={categories}
                currencies={currencies}/>

      </>

    )
  }
}

type MapStateType = any /// add configure final

const mapState = (state: AppRootStateType): MapStateType => ({
  currencies: state.currencies.currencies,
  categories: state.categories.categories,
})
type MapDispatchType = {
  setCurrenciesAC: (currency: any) => void
  setCategoriesThunkCreator: () => void
}


const mapDispatch = {
  setCategoriesThunkCreator,
  setCurrenciesThunkCreator,
}

export default connect(mapState, mapDispatch)(App);


