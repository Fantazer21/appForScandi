import React, {FormEventHandler} from "react";
import logo from '../../images/logo.png'
import cart from '../../images/cart.png'
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
import {CurrenciesNamesTypes} from "../../bll/reducers/currency-reducer";

type CategoryType = {
  name: string
}


type HeaderPropsType = {
  categoriesName: Array<CategoryType>,
  currencies: Array<CurrenciesNamesTypes>,
  setCurrentCurrencyAC: (currency: CurrenciesNamesTypes) => void
  currentCurrency: CurrenciesNamesTypes,
}

export class Header extends React.PureComponent<HeaderPropsType> {

  setCurrency(currency: string) {
    this.props.setCurrentCurrencyAC(currency as CurrenciesNamesTypes)
  }

  render() {
    const {categoriesName, currencies, currentCurrency} = this.props
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.navigation}>
            {categoriesName.map((category: CategoryType, ind: number) => {
              return <NavLink key={ind + 314} to={'/products'}>
                <li>{category.name}</li>
              </NavLink>
            })}
          </ul>
        </nav>
        <img className={styles.logo} src={logo} alt='logo'/>


        <div className={styles.headerActions}>
          <select value={currentCurrency} onChange={(e) => this.setCurrency(e.target.value)}>
            {currencies.map((currency: string, ind: number) => {
              return <option key={ind + 212} value={currency}>{currency}</option>
            })}
          </select>
          <img className={styles.cart} src={cart} alt='cart'/>
        </div>
      </header>
    )
  }
}



