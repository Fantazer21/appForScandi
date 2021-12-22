import React from "react";
import s from './Pdp.module.css'
import {ProductsType} from "../../bll/reducers/categories-reducer";
import parse from 'html-react-parser'

type PdpPropsType = {
  currentCurrency: string
  proDesc: ProductsType
  addToCart: (order: ProductsType) => void
  changePhoto: (ph: string) => void
  activePhoto: string
  attribute: string
  setAttribute: (val: string) => void
}

export class Pdp extends React.PureComponent<PdpPropsType> {

  addProductToCart(order: ProductsType) {
    this.props.addToCart(order)
    this.props.setAttribute('dsds')
  }

  componentDidMount() {
    this.props.changePhoto(this.props.proDesc.gallery[0])
  }

  render() {
    console.log(this.props.proDesc)
    const {currentCurrency, proDesc} = this.props
    return (
      <div className={s.containerPdp}>
        <div className={s.listImg}>
          {proDesc.gallery.map(i => {
            return <img className={s.listImgItem} src={`${i}`}
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
                {proDesc.attributes.map(el => {
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
                                                       className={s.spanItem}></span></div>)}
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
                    onClick={() => this.addProductToCart(proDesc)}
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



