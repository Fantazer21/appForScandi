import React from "react";
import s from './Pdp.module.css'
import {ProductType} from "../../bll/reducers/categories-reducer";
import parse from 'html-react-parser'

type PdpPropsType = {
  currentCurrency: string
  proDesc: ProductType
  addToCart: (order: ProductType) => void
  changePhoto: (ph: string) => void
  activePhoto: string
  attribute: string
  setAttribute: (val: string) => void
  cartOrders: Array<ProductType>
}

export class Pdp extends React.PureComponent<PdpPropsType> {

  addProductToCart(order: ProductType, cartOrders: Array<ProductType>) {
    if (cartOrders.find(el => el.id === order.id) === undefined) {
      this.props.addToCart({...order, quantity: 1})
    } else alert('You already added this item')
  }

  componentDidMount() {
    this.props.changePhoto(this.props.proDesc.gallery[0])
  }


  render() {
    const {currentCurrency, proDesc} = this.props
    return (
      <div className={s.containerPdp}>
        <div className={s.listImg}>
          {proDesc.gallery.map((i, ind) => {
            return <img key={ind.toString()} className={s.listImgItem} src={`${i}`} alt='text'
                        onMouseOver={() => this.props.changePhoto(i)}/>
          })}
        </div>
        <div className={s.productD}>
          <div className={s.mainImgWrapper}>
            <img className={s.mainImg} src={`${this.props.activePhoto}`} alt={'qwqw'}/>
          </div>
          <div>
            <div className={s.title}>
              {proDesc.name}</div>
            <div className={s.brandName}>{proDesc.brand}</div>
            <div className={s.attributesTitle}>
              <div className={s.attributesDescription}>
                {proDesc.attributes.map((el,ind) => {
                  if (el.type === 'text') {
                    return <div key={ind+1212}>
                      {el.name}
                      <div className={s.attributeMenu}>
                        {el.items.map((el, ind) => <div key={ind+34}><span
                          style={({background: `${el.value}`})}
                          className={s.spanItem}>{el.value}</span></div>)}
                      </div>
                    </div>
                  } else {
                    return <div key={ind+2}>
                      <div className={s.attributeMenu}>
                        {el.items.map((el, ind) => <div key={ind+32}> <span style={({background: `${el.value}`})}
                                                        className={s.spanItem}> </span></div>)}
                      </div>
                    </div>
                  }
                })}
              </div>
            </div>
            <div className={s.priceStyles}>PRICE:</div>
            <div
              className={s.currencyStyles}>{currentCurrency} {proDesc.prices.find(pr => (pr.currency === currentCurrency)).amount} </div>
            <button className={`${s.buttonAdd} ${proDesc.inStock ? '' : s.disabled}`}
                    onClick={() => this.addProductToCart(proDesc, this.props.cartOrders)}
                    disabled={!proDesc.inStock}>Add to cart
            </button>
            <div>
              {parse(proDesc.description)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
