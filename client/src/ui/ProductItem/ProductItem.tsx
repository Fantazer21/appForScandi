import React from "react";
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import {ProductType} from "../../bll/reducers/categories-reducer";
import s from './ProductItem.module.css'
import {NavLink} from "react-router-dom";

type ProductItemType = {
  currentCurrency: CurrenciesNamesTypes,
  products: Array<ProductType>,
  setProductDescription: (productDescription: ProductType) => void,
  title: string
}

export class ProductItem extends React.PureComponent<ProductItemType> {
  setProdDesc(productDescription: ProductType) {
    this.props.setProductDescription(productDescription)
  }

  render() {
    const {currentCurrency, products, title} = this.props
    return (
      <>
        <div className={s.title}>{title}</div>
        <div className={s.productMap}>
          {products.map((el, ind) => <div key={ind + 432} className={`${s.compProdCard} ${!el.inStock && s.outStock}`}>
            <div className={s.imageWrapper}>
              {!el.inStock && <span className={s.outOfStock}>OUT OF STOCK</span>}
              <NavLink to={'/pdp'} onClick={() => this.setProdDesc(el)}> <img className={s.image} src={el.gallery[0]}
                                                                              alt={'PhotoProduct'}/> </NavLink>
            </div>
            <div className={s.descPrice}>
              <div className={s.nameProduct}>{el.name}</div>
              <div
                className={s.compProdCardPrice}> {currentCurrency} {el.prices.find(pr => (pr.currency === currentCurrency)).amount
              }
              </div>
            </div>
          </div>)}
        </div>
      </>


    )
  }
}
