import React from "react";
import {CurrenciesNamesTypes} from "../bll/reducers/currency-reducer";
import {ProductsType} from "../bll/reducers/categories-reducer";
import {ProductItem} from "./ProductItem/ProductItem";

type ProductsPropsType = {
  currentCurrency: CurrenciesNamesTypes,
  productsClothes: Array<ProductsType>,
  productsTech: Array<ProductsType>,
}

export class Products extends React.PureComponent<ProductsPropsType> {


  render() {

    const {productsClothes, currentCurrency, productsTech} = this.props
    console.log(productsClothes[0])
    return (
      <>
          <ProductItem currentCurrency={currentCurrency} products={productsClothes}/>
          <ProductItem currentCurrency={currentCurrency} products={productsTech}/>
      </>
    )
  }
}




