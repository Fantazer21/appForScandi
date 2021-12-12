import React from "react";
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import {ProductsType} from "../../bll/reducers/categories-reducer";
import s from './ProductItem.module.css'

type ProductItemType = {
  currentCurrency: CurrenciesNamesTypes,
  products: Array<ProductsType>
}

export class ProductItem extends React.PureComponent<ProductItemType>{
  render() {
    const  {currentCurrency, products } = this.props
    return (
      <>
        {products.map((el, ind) => <div key={ind+432} >
          <img className={s.image} src={el.gallery[0]} alt={'PhotoProduct'}/>
          <div>{el.id}</div>
          <div> {currentCurrency} {el.prices.find(pr => (pr.currency === currentCurrency)).amount
          }</div>
        </div>)}
      </>
    )
  }
}