import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import {
  CurrenciesArrayType,
  CurrenciesNamesTypes,
  setCurrenciesThunkCreator,
  setCurrentCurrencyAC
} from "../bll/reducers/currency-reducer";
import {AppRootStateType} from "../bll/store";
import {Header} from "./Header/Header";
import {
  CategoryNameType,
  getProductsThunkCreator,
  ProductsType,
  setCategoriesThunkCreator
} from "../bll/reducers/categories-reducer";
import {Route, Routes} from 'react-router-dom';
import {Products} from "./Products";


type AppPropsType = MapStateType & MapDispatchType

class App extends React.PureComponent<AppPropsType> {
  constructor(props: AppPropsType) {
    super(props)
  }

  componentDidMount() {
    this.props.setCategoriesThunkCreator()
    this.props.setCurrenciesThunkCreator()
    this.props.getProductsThunkCreator()
  }


  render() {
    const {
      categoriesName, currencies, currentCurrency, setCurrentCurrencyAC, productsClothes, productsTech
    } = this.props

    return (
      <>
        <Header categoriesName={categoriesName}
                currencies={currencies}
                setCurrentCurrencyAC={setCurrentCurrencyAC}
                currentCurrency={currentCurrency}

        />
        <>CATEGORY NAME</>
        <main>
          {/*instead of switch v5*/}
          <Routes>
            <Route path='/' element={<Products currentCurrency={currentCurrency}
                                               productsClothes={productsClothes}
                                               productsTech={productsTech}/>}/>
            <Route path='/products' element={<Products productsClothes={productsClothes}
                                                       currentCurrency={currentCurrency}
                                                       productsTech={productsTech}
            />}/>
            {/*<Route path = '*' element={<Error/>}/>*/}
          </Routes>
        </main>
      </>
    )
  }
}


type MapStateType = {
  currencies: CurrenciesArrayType
  categoriesName: Array<CategoryNameType>
  currentCurrency: CurrenciesNamesTypes
  productsClothes: Array<ProductsType>
  productsTech: Array<ProductsType>
}

const mapState = (state: AppRootStateType): MapStateType => ({
  currencies: state.currencies.currencies,
  categoriesName: state.categories.categories,
  currentCurrency: state.currencies.currentCurrency,
  productsClothes: state.categories.productsClothes,
  productsTech: state.categories.productsTech,
})

type MapDispatchType = {
  setCurrenciesThunkCreator: () => void
  setCategoriesThunkCreator: () => void
  setCurrentCurrencyAC: (currency: CurrenciesNamesTypes) => void
  getProductsThunkCreator: () => void
}


const mapDispatch = {
  setCategoriesThunkCreator,
  setCurrenciesThunkCreator,
  setCurrentCurrencyAC,
  getProductsThunkCreator,
}

export default connect(mapState, mapDispatch)(App);


