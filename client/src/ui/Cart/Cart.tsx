import React from "react";
import s from './Cart.module.css'
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import {ProductsType} from "../../bll/reducers/categories-reducer";

type CartPropsType = {
  currentCurrency: CurrenciesNamesTypes,
  cartOrders: Array<ProductsType>,
  addToCart: (order: ProductsType) => void
  removeFromCart: (order: string) => void
}

export default class Cart extends React.PureComponent<CartPropsType> {
  addProductToCart(order: ProductsType) {
    this.props.addToCart(order)
  }

  removeFromProductCart(order: string) {
    // console.log(this.props.cartOrders.filter(el => el.id === order).shift())
    console.log(order)

    this.props.removeFromCart(order)
    console.log(this.props.cartOrders)
  }

  render() {
    const {currentCurrency, cartOrders} = this.props
    return (

      <div>
        <h1>Cart</h1>
        <div className={s.cartList}>
          {cartOrders.filter((value, index, self) =>
              index === self.findIndex((t) => (
                t.id === value.id
              ))
          ).map(el => <div className={s.CartProduct}>
              <div className={s.CartProductDescription}>
                <div className={s.CartProductTitle}>
                  <h2 className={s.brandTitle}>
                    {el.brand}
                  </h2>
                  <div className={s.brandName}>{el.name}</div>
                  <div
                    className={s.currencyStyles}> {currentCurrency} {el.prices.find(pr => (pr.currency === currentCurrency)).amount}</div>
                  <div className={s.attributesDescription}>
                    {el.attributes.map(el => {
                      if (el.type === 'text') {
                        return <div>
                          {el.name}
                          <div className={s.attributeMenu}>
                            {el.items.map(el => <div><span style={({background: `${el.value}`})}
                                                           className={s.spanItem}>{el.value}</span></div>)}
                          </div>
                        </div>
                      } else {
                        return <div>
                          <div className={s.attributeMenu}>
                            {el.items.map(el => <div><span style={({background: `${el.value}`})}
                                                           className={s.spanItem}/></div>)}
                          </div>
                        </div>
                      }
                    })}
                  </div>

                </div>
              </div>
              <div className={s.rightSection}>
                <div className={s.Buttons}>
                  <div>
                    <button className={s.buttonIncDec} onClick={() => this.addProductToCart(el)}>+</button>
                  </div>

                  <div className={s.quantityOrders}>{cartOrders.filter(pr => pr.id === el.id).length}</div>
                  <div>
                    <button className={s.buttonIncDec} onClick={() => this.removeFromProductCart(el.id)}>-</button>
                  </div>

                </div>
                <div className={s.imgWrapper}><img className={s.imgDesc}  src={`${el.gallery[0]}`} alt="descCard"/></div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

