import React, {FormEventHandler} from "react";
import logo from '../../images/logo.png'
import cart from '../../images/cart.png'
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";
import {ProductsType} from "../../bll/reducers/categories-reducer";

type CategoryType = {
  name: string
}


type HeaderPropsType = {
  categoriesName: Array<CategoryType>,
  currencies: Array<CurrenciesNamesTypes>,
  setCurrentCurrencyAC: (currency: CurrenciesNamesTypes) => void
  currentCurrency: CurrenciesNamesTypes,
  cartOrders: Array<ProductsType>,
  activeCategory: number,
  setActiveCategory: (num: number) => void
}

export class Header extends React.PureComponent<HeaderPropsType> {

  setCurrency(currency: string) {
    this.props.setCurrentCurrencyAC(currency as CurrenciesNamesTypes)
  }
  setActiveCategory( ind: number) {
    this.props.setActiveCategory(ind)
  }

  render() {
    const {categoriesName, currencies, currentCurrency, cartOrders, activeCategory} = this.props
    console.log(cartOrders)
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.navigation}>
            {categoriesName.map((category: CategoryType, ind: number) => {
              return <NavLink className={styles.navLink} key={ind + 314} to={`/${category.name}`}>
                <li className={`${styles.navLinkName} ${ind === activeCategory ? styles.active : ''} `}
                onClick={() => this.setActiveCategory(ind)}>{category.name}</li>
              </NavLink>
            })}
          </ul>
        </nav>
        <div>
          <img className={styles.logo} src={logo} alt='logo'/>
        </div>
        <div className={styles.headerActions}>
          <div>
            <select value={currentCurrency} onChange={(e) => this.setCurrency(e.target.value)}>
              {currencies.map((currency: string, ind: number) => {
                return <option key={ind + 212} value={currency}>{currency}</option>
              })}
            </select>
          </div>
          <img className={styles.cart} src={cart} alt='cart'/>
        </div>
      </header>
    )
  }
}



