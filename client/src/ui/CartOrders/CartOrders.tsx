import React from "react";
import {ProductType} from "../../bll/reducers/categories-reducer";
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import s from './CartOrders.module.css'
import {NavLink} from "react-router-dom";

type CartOrdersType = {
  currentCurrency: CurrenciesNamesTypes,
  cartOrders: Array<ProductType>,
  addToCart: (order: ProductType) => void
  removeFromCart: (order: string) => void
  setToggle: (val: boolean) => void,
  toggleCart: boolean
  incQuantity: (id: string) => void
  decQuantity: (id: string) => void
}

export default class CartOrders extends React.PureComponent<CartOrdersType> {
  addProductToCart(order: ProductType) {
    this.props.addToCart(order)
  }

  removeFromProductCart(id: string, el: ProductType) {
    if (el.quantity === 1) {
      this.props.removeFromCart(id)
    } else {
      this.props.decQuantity(id)
    }
  }

  render() {
    const {currentCurrency, cartOrders, setToggle} = this.props
    return (
      <div className={s.cover}>
        <div className={s.cartOrdersContainer}>
          <div className={s.titLeCart}>My Bag: {cartOrders.length} items</div>
          <div className={s.cartList}>
            {cartOrders.map((el,ind) => {
                if (el.quantity > 0) {
                  return <div key={ind+2317} className={s.CartProduct}>
                    <div className={s.CartProductDescription}>
                      <div className={s.CartProductTitle}>
                        <div className={s.brandTitle}>
                          {el.brand}
                        </div>
                        <div className={s.brandName}>{el.name}</div>
                        <div
                          className={s.currencyStyles}> {currentCurrency} {el.prices.find(pr => (pr.currency === currentCurrency)).amount}</div>
                        <div className={s.attributesDescription}>
                          {el.attributes.map((el, ind) => {
                            if (el.type === 'text') {
                              return <div key={ind+342}>
                                {el.name}
                                <div className={s.attributeMenu}>
                                  {el.items.map((el, ind) => <div key={ind+12} className={s.spanItem}
                                                           style={({background: `${el.value}`})}>{el.value}</div>)}
                                </div>
                              </div>
                            } else {
                              return <div key={ind+4343}>
                                <div className={s.attributeMenu}>
                                  {el.items.map((el,ind) => <div key={ind+234}><span style={({background: `${el.value}`})}
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
                      <div className={s.imgWrapper}><img className={s.imgDesc} src={`${el.gallery[0]}`} alt="descCard"/>
                      </div>
                    </div>
                  </div>
                }
                else {
                  return null
                }
              }
            )}
          </div>
          <div className={s.buttons}>
            <NavLink className={s.viewBtn} to={'/cart'} onClick={() => setToggle(!this.props.toggleCart)}>view
              bag</NavLink>
            <NavLink className={s.checkoutBtn} to={'/'}>check out</NavLink>
          </div>
        </div>
      </div>

    )
  }
}



