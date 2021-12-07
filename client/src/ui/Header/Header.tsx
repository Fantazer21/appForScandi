import React from "react";
import logo from '../../images/logo.png'
import cart from '../../images/cart.png'
import styles from './Header.module.css'

type HeaderPropsType = {
  categories: [],
  currencies: [],
}

export class Header extends React.PureComponent<HeaderPropsType> {


  render() {
    const {categories, currencies} = this.props
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.navigation}>
            {categories.map((category: CategoryType, ind: number) => {
              return <li key={ind + 314}>{category.name}</li>
            })}
          </ul>
        </nav>
        <img className={styles.logo} src={logo}/>


        <div className={styles.headerActions}>
          <select>
            {currencies.map( (currency: Array<string>, ind: number) => {
              return <option key={ind+212} value={currency}>{currency}</option>
            })}
          </select>
          <img className={styles.cart} src={cart} alt='cart'/>
        </div>
      </header>
    )
  }
}



type CategoryType = {
  name: string
}