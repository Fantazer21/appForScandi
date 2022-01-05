import React from "react";
import s from './Cart.module.css'
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import {ProductDescriptionWithQuantityType, ProductType} from "../../bll/reducers/categories-reducer";

type CartPropsType = {
  currentCurrency: CurrenciesNamesTypes,
  cartOrders: Array<ProductType>,
  addToCart: (order: ProductType) => void
  removeFromCart: (order: string) => void
  incQuantity: (id: string) => void
  decQuantity: (id: string) => void
}

export default class Cart extends React.PureComponent<CartPropsType> {
  addProductToCart(order: ProductType, cartOrders: Array<ProductType>) {
    const product = cartOrders.find(el => el.id === order.id)
    if (!product) {
      alert("You are already added this item")
    } else {
      if (product) {
        const productWithQuantity: ProductDescriptionWithQuantityType = {...order, quantity: 1}
        this.props.addToCart(productWithQuantity)
      }
    }
  }

  removeFromProductCart(id: string, el: ProductType) {
    if (el.quantity === 1) {
      this.props.removeFromCart(id)
    } else {
      this.props.decQuantity(id)
    }
  }

  render() {
    const {currentCurrency, cartOrders} = this.props
    return (
      <div>
        <h1>Cart</h1>
        <div className={s.cartList}>
          {cartOrders.map((el,ind) => {
            if(el.quantity > 0) {
              return <div key={ind} className={s.CartProduct}>
                <div className={s.CartProductDescription}>
                  <div className={s.CartProductTitle}>
                    <h2 className={s.brandTitle}>
                      {el.brand}
                    </h2>
                    <div className={s.brandName}>{el.name}</div>
                    <div
                      className={s.currencyStyles}> {currentCurrency} {el.prices.find(pr => (pr.currency === currentCurrency)).amount}</div>
                    <div className={s.attributesDescription}>
                      {el.attributes.map((el,key) => {
                        if (el.type === 'text') {
                          return <div key={key+232}>
                            {el.name}
                            <div className={s.attributeMenu}>
                              {el.items.map((el, ind) => <div key={ind+2323}><span style={({background: `${el.value}`})}
                                                             className={s.spanItem}>{el.value}</span></div>)}
                            </div>
                          </div>
                        } else {
                          return <div key={ind+2322}>
                            <div className={s.attributeMenu}>
                              {el.items.map((el,key) => <div key={key+32423}><span style={({background: `${el.value}`})}
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
                      <button className={s.buttonIncDec} onClick={() => this.props.incQuantity(el.id)}>+</button>
                    </div>
                    <div className={s.quantityOrders}>{el.quantity}</div>
                    <div>
                      <button className={s.buttonIncDec} onClick={() => this.removeFromProductCart(el.id, el)}>-</button>
                    </div>
                  </div>
                  <div className={s.imgWrapper}><img className={s.imgDesc} src={`${el.gallery[0]}`} alt="descCard"/></div>
                </div>
              </div>
            }
            else return null
          }

          )}
        </div>
      </div>
    )
  }
}

