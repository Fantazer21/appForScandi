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
  addToCartAC,
  CategoryNameType,
  getProductsThunkCreator,
  ProductsType,
  setCategoriesThunkCreator, setProductDescriptionAC
} from "../bll/reducers/categories-reducer";
import {Route, Routes} from 'react-router-dom';
import {ProductItem} from "./ProductItem/ProductItem";
import {Pdp} from "./Pdp/Pdp";


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
      categoriesName, currencies, currentCurrency, setCurrentCurrencyAC, productsClothes, productsTech, setProductDescriptionAC, productDescription, cartOrders, addToCartAC
    } = this.props

    return (
      <>
        <Header categoriesName={categoriesName}
                currencies={currencies}
                setCurrentCurrencyAC={setCurrentCurrencyAC}
                currentCurrency={currentCurrency}
                cartOrders={cartOrders}
        />
        <>CATEGORY NAME</>
        <main>
          <Routes>
            <Route path='/' element={<ProductItem currentCurrency={currentCurrency} products={productsClothes} setProductDescription={setProductDescriptionAC}/>}/>
            <Route path='/clothes' element={<ProductItem currentCurrency={currentCurrency} products={productsClothes} setProductDescription={setProductDescriptionAC}/>}/>
            <Route path='/tech' element={<ProductItem currentCurrency={currentCurrency} products={productsTech} setProductDescription={setProductDescriptionAC}/>}/>
            <Route path='/pdp' element={<Pdp currentCurrency={currentCurrency} proDesc={productDescription} addToCart={addToCartAC}/>}/>
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
  productDescription: ProductsType
  cartOrders: Array<ProductsType>
}

const mapState = (state: AppRootStateType): MapStateType => ({
  currencies: state.currencies.currencies,
  categoriesName: state.categories.categories,
  currentCurrency: state.currencies.currentCurrency,
  productsClothes: state.categories.productsClothes,
  productsTech: state.categories.productsTech,
  productDescription: state.categories.productDescription,
  cartOrders: state.categories.cartOrders
})

type MapDispatchType = {
  setCurrenciesThunkCreator: () => void
  setCategoriesThunkCreator: () => void
  setCurrentCurrencyAC: (currency: CurrenciesNamesTypes) => void
  getProductsThunkCreator: () => void
  setProductDescriptionAC: (productDescription: ProductsType) => void
  addToCartAC: (order: ProductsType) => void
}


const mapDispatch = {
  setCategoriesThunkCreator,
  setCurrenciesThunkCreator,
  setCurrentCurrencyAC,
  getProductsThunkCreator,
  setProductDescriptionAC,
  addToCartAC,
}

export default connect(mapState, mapDispatch)(App);


