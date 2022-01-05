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
  changeActivePhotoPdpAC, decProdQuantityAC,
  getProductsThunkCreator, incProdQuantityAC,
  ProductType, removeFromCartAC, setActiveCategoryAC,
  setAttributeAC,
  setCategoriesThunkCreator, setProductDescriptionAC, setToggleCartAC
} from "../bll/reducers/categories-reducer";
import {Route, Routes} from 'react-router-dom';
import {ProductItem} from "./ProductItem/ProductItem";
import {Pdp} from "./Pdp/Pdp";
import Cart from './Cart/Cart';
import CartOrders from "./CartOrders/CartOrders";


type AppPropsType = MapStateType & MapDispatchType

class App extends React.PureComponent<AppPropsType> {


  componentDidMount() {
    this.props.setCategoriesThunkCreator()
    this.props.setCurrenciesThunkCreator()
    this.props.getProductsThunkCreator()
  }


  render() {
    const {
      categoriesName,
      currencies,
      currentCurrency,
      setCurrentCurrencyAC,
      productsClothes,
      productsTech,
      setProductDescriptionAC,
      productDescription,
      cartOrders,
      addToCartAC,
      removeFromCartAC,
      setActiveCategoryAC,
      activeCategory,
      changeActivePhotoPdpAC,
      activePhotoPdp,
      attribute,
      setAttributeAC,
      toggleCart,
      setToggleCartAC,
      incProdQuantityAC,
      decProdQuantityAC
    } = this.props

    return (
      <div className={'App'}>
        {this.props.toggleCart && <CartOrders currentCurrency={currentCurrency}
                                              cartOrders={cartOrders}
                                              addToCart={addToCartAC}
                                              removeFromCart={removeFromCartAC}
                                              setToggle={setToggleCartAC}
                                              toggleCart={toggleCart}
                                              incQuantity ={incProdQuantityAC}
                                              decQuantity = {decProdQuantityAC}
        />}
        <Header categoriesName={categoriesName}
                currencies={currencies}
                setCurrentCurrencyAC={setCurrentCurrencyAC}
                currentCurrency={currentCurrency}
                cartOrders={cartOrders}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategoryAC}
                setToggle={setToggleCartAC}
                toggleCart={toggleCart}
        />
        <main>
          <Routes>
            <Route path='/'
                   element={<ProductItem title={'Clothes'} currentCurrency={currentCurrency} products={productsClothes}
                                         setProductDescription={setProductDescriptionAC}/>}/>
            <Route path='/clothes'
                   element={<ProductItem title={'Clothes'} currentCurrency={currentCurrency} products={productsClothes}
                                         setProductDescription={setProductDescriptionAC}/>}/>
            <Route path='/tech'
                   element={<ProductItem title={'Tech'} currentCurrency={currentCurrency} products={productsTech}
                                         setProductDescription={setProductDescriptionAC}/>}/>
            <Route path='/pdp'
                   element={<Pdp attribute={attribute}
                                 setAttribute={setAttributeAC}
                                 activePhoto={activePhotoPdp}
                                 changePhoto={changeActivePhotoPdpAC}
                                 currentCurrency={currentCurrency}
                                 proDesc={productDescription}
                                 addToCart={addToCartAC}
                                 cartOrders={cartOrders}

                   />}/>
            <Route path='/cart'
                   element={<Cart currentCurrency={currentCurrency}
                                  cartOrders={cartOrders}
                                  addToCart={addToCartAC}
                                  removeFromCart={removeFromCartAC}
                                  incQuantity ={incProdQuantityAC}
                                  decQuantity = {decProdQuantityAC}
                   />}/>
          </Routes>
        </main>
      </div>
    )
  }
}


type MapStateType = {
  currencies: CurrenciesArrayType,
  categoriesName: Array<CategoryNameType>,
  currentCurrency: CurrenciesNamesTypes,
  productsClothes: Array<ProductType>,
  productsTech: Array<ProductType>,
  productDescription: ProductType,
  cartOrders: Array<ProductType>,
  activeCategory: number,
  activePhotoPdp: string,
  attribute: string,
  toggleCart: boolean
}

const mapState = (state: AppRootStateType): MapStateType => ({
  currencies: state.currencies.currencies,
  categoriesName: state.categories.categories,
  currentCurrency: state.currencies.currentCurrency,
  productsClothes: state.categories.productsClothes,
  productsTech: state.categories.productsTech,
  productDescription: state.categories.productDescription,
  cartOrders: state.categories.cartOrders,
  activeCategory: state.categories.activeCategory,
  activePhotoPdp: state.categories.currentPhotoPdp,
  attribute: state.categories.attribute,
  toggleCart: state.categories.toggleCart,
})

type MapDispatchType = {
  setCurrenciesThunkCreator: () => void,
  setCategoriesThunkCreator: () => void,
  setCurrentCurrencyAC: (currency: CurrenciesNamesTypes) => void,
  getProductsThunkCreator: () => void,
  setProductDescriptionAC: (productDescription: ProductType) => void,
  addToCartAC: (order: ProductType) => void,
  removeFromCartAC: (order: string) => void,
  setActiveCategoryAC: (actCat: number) => void
  changeActivePhotoPdpAC: (ph: string) => void
  setAttributeAC: (val: string) => void
  setToggleCartAC: (val: boolean) => void
  incProdQuantityAC: (id: string) => void
  decProdQuantityAC: (id: string) => void
}

const mapDispatch = {
  setCategoriesThunkCreator,
  setCurrenciesThunkCreator,
  setCurrentCurrencyAC,
  getProductsThunkCreator,
  setProductDescriptionAC,
  addToCartAC,
  removeFromCartAC,
  setActiveCategoryAC,
  changeActivePhotoPdpAC,
  setAttributeAC,
  setToggleCartAC,
  incProdQuantityAC,
  decProdQuantityAC
}

export default connect(mapState, mapDispatch)(App);
