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
  changeActivePhotoPdpAC,
  getProductsThunkCreator,
  ProductsType, removeFromCartAC, setActiveCategoryAC,
  setAttributeAC,
  setCategoriesThunkCreator, setProductDescriptionAC
} from "../bll/reducers/categories-reducer";
import {Route, Routes} from 'react-router-dom';
import {ProductItem} from "./ProductItem/ProductItem";
import {Pdp} from "./Pdp/Pdp";
import Cart from './Cart/Cart';


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
      setAttributeAC
    } = this.props

    return (
      <div className={'App'}>
          <Header categoriesName={categoriesName}
                  currencies={currencies}
                  setCurrentCurrencyAC={setCurrentCurrencyAC}
                  currentCurrency={currentCurrency}
                  cartOrders={cartOrders}
                  activeCategory={activeCategory}
                  setActiveCategory ={setActiveCategoryAC}
          />
          <main>
            <Routes>
              <Route path='/' element={<ProductItem title={'Clothes'} currentCurrency={currentCurrency} products={productsClothes}
                                                    setProductDescription={setProductDescriptionAC}/>}/>
              <Route path='/clothes' element={<ProductItem title={'Clothes'} currentCurrency={currentCurrency} products={productsClothes}
                                                           setProductDescription={setProductDescriptionAC}/>}/>
              <Route path='/tech' element={<ProductItem  title={'Tech'}currentCurrency={currentCurrency} products={productsTech}
                                                         setProductDescription={setProductDescriptionAC}/>}/>
              <Route path='/pdp' element={<Pdp attribute={attribute} setAttribute={setAttributeAC} activePhoto={activePhotoPdp} changePhoto={changeActivePhotoPdpAC}  currentCurrency={currentCurrency} proDesc={productDescription}
                                               addToCart={addToCartAC}/>}/>
              <Route path='/cart'
                     element={<Cart currentCurrency={currentCurrency} cartOrders={cartOrders} addToCart={addToCartAC}
                                    removeFromCart={removeFromCartAC}/>}/>
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
  productsClothes: Array<ProductsType>,
  productsTech: Array<ProductsType>,
  productDescription: ProductsType,
  cartOrders: Array<ProductsType>,
  activeCategory: number,
  activePhotoPdp:  string
  attribute: string
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
  attribute: state.categories.attribute
})

type MapDispatchType = {
  setCurrenciesThunkCreator: () => void,
  setCategoriesThunkCreator: () => void,
  setCurrentCurrencyAC: (currency: CurrenciesNamesTypes) => void,
  getProductsThunkCreator: () => void,
  setProductDescriptionAC: (productDescription: ProductsType) => void,
  addToCartAC: (order: ProductsType) => void,
  removeFromCartAC: (order: string) => void,
  setActiveCategoryAC: (actCat: number) => void
  changeActivePhotoPdpAC: (ph: string) => void
  setAttributeAC: (val: string) => void
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
}

export default connect(mapState, mapDispatch)(App);


