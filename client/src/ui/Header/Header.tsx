import React from "react";
import logo from '../../images/logo.png'
import cart from '../../images/cart.png'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import {ProductType} from "../../bll/reducers/categories-reducer";



type CategoryType = {
  name: string
}


type HeaderPropsType = {
  categoriesName: Array<CategoryType>,
  currencies: Array<CurrenciesNamesTypes>,
  setCurrentCurrencyAC: (currency: CurrenciesNamesTypes) => void
  currentCurrency: CurrenciesNamesTypes,
  cartOrders: Array<ProductType>,
  activeCategory: number,
  setActiveCategory: (num: number) => void,
  setToggle: (val: boolean) => void,
  toggleCart: boolean
}

export class Header extends React.PureComponent<HeaderPropsType> {

  setCurrency(currency: string) {
    this.props.setCurrentCurrencyAC(currency as CurrenciesNamesTypes)
  }
  setActiveCategory( ind: number) {
    this.props.setActiveCategory(ind)
  }

  render() {
    const {categoriesName, currencies, currentCurrency, cartOrders, activeCategory, setToggle} = this.props
    return (
      <header className={s.header}>
        <nav>
          <ul className={s.navigation}>
            {categoriesName.map((category: CategoryType, ind: number) => {
              return <NavLink className={s.navLink} key={ind + 314} to={`/${category.name}`}>
                <li className={`${s.navLinkName} ${ind === activeCategory ? s.active : ''} `}
                onClick={() => this.setActiveCategory(ind)}>{category.name}</li>
              </NavLink>
            })}
          </ul>
        </nav>
        <div>
          <img className={s.logo} src={logo} alt='logo'/>
        </div>
        <div className={s.headerActions}>
          <div>
            <select className={s.select} value={currentCurrency} onChange={(e) => this.setCurrency(e.target.value)}>
              {currencies.map((currency: string, ind: number) => {
                return <option key={ind + 212} value={currency}>{currency}</option>
              })}
            </select>
          </div>
          <span onClick={() => setToggle(!this.props.toggleCart)} className={s.cart}>
              <img className={s.cartImage}  src={cart} alt="Cart"/>
            {cartOrders.length ?
              <span className={s.cartQuantity}>{cartOrders.length}</span> : null}
            </span>

        </div>
      </header>
    )
  }
}




