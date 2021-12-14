import React from "react";
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import {ProductsType} from "../../bll/reducers/categories-reducer";
import s from './ProductItem.module.css'
import {NavLink, Route} from "react-router-dom";
import {Pdp} from "../Pdp/Pdp";

type ProductItemType = {
  currentCurrency: CurrenciesNamesTypes,
  products: Array<ProductsType>,
  setProductDescription: (productDescription: ProductsType) => void
}

export class ProductItem extends React.PureComponent<ProductItemType>{
  setProdDesc(productDescription: ProductsType) {
    this.props.setProductDescription(productDescription)
  }
  render() {
    const  {currentCurrency, products } = this.props
    return (
      <>
          {products.map((el, ind) => <div key={ind+432} >

            <NavLink to={'/pdp'} onClick={() => this.setProdDesc(el)}>  <img className={s.image} src={el.gallery[0]} alt={'PhotoProduct'}/> </NavLink>
            <div>{el.id}</div>
            <div> {currentCurrency} {el.prices.find(pr => (pr.currency === currentCurrency)).amount
            }</div>
          </div>)}
      </>
    )
  }
}