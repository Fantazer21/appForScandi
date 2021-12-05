import React from "react";
import logo from '../images/logo.png'
import cart from '../images/cart.png'

type HeaderPropsType = {
  categories: [],
  currencies: [],
}

export class Header extends React.PureComponent<HeaderPropsType> {


  render() {
    const {categories, currencies} = this.props
    return (
      <header>
        <nav>
          <ul>
            {categories.map((category: CategoryType, ind: number) => {
              return <li key={ind + 314}>{category.name}</li>
            })}
          </ul>
        </nav>

        <img className={''} src={logo}/>
          <select>
            {currencies.map( (currency: Array<string>, ind: number) => {
              return <option key={ind+212} value={currency}>{currency}</option>
            })}
          </select>
        <img src={cart} alt='cart'/>
      </header>
    )
  }
}



type CategoryType = {
  name: string
}