import React from "react";
import s from './Pdp.module.css'
import {ProductsType} from "../../bll/reducers/categories-reducer";

type PdpPropsType = {
  currentCurrency: string
  proDesc: ProductsType
  addToCart: (order: ProductsType) => void
}

export class Pdp extends React.PureComponent<PdpPropsType> {

  addProductToCart(order: ProductsType) {
    console.log(order)
    this.props.addToCart(order)
  }

  render() {
    const {currentCurrency, proDesc} = this.props
    return (
      <div className={s.containerPdp}>
        <div className={s.listImg}>
          {proDesc.gallery.map(i => {
            return <img width={'100px'} src={`${i}`}/>
          })}
        </div>
        <div className={s.productD}>
          <div>
            <img width={'400px'} src={`${proDesc.gallery[2]}`}/>
          </div>
          <div>
            <div>{proDesc.name}</div>
            <div>{proDesc.id}</div>
            <div>Size ????</div>
            <h3>Price</h3>
            <div>{currentCurrency} {proDesc.prices.find(pr => (pr.currency === currentCurrency)).amount} </div>
            <button onClick={() => this.addProductToCart(proDesc)}>Add to cart</button>
            <div>{proDesc.description}</div>

          </div>
        </div>


      </div>

    )
  }

}



