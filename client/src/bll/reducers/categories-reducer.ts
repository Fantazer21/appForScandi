import {query, request} from "../../dal/apiRequest";
import {Query} from "@tilework/opus";
import {Dispatch} from "redux";

export type ProductType = {
  id: string
  name: string
  inStock: boolean
  gallery: Array<string>
  description: string
  category: string
  prices: Array<any>
  brand: string
  attributes: AttributeSetType[]
  quantity: number
}

export type ProductDescriptionWithQuantityType = ProductType & { quantity: number }

type AttributeSetType = {
  id: string,
  name: string,
  type: string,
  items: AttributeType[]
}
type AttributeType = {
  displayValue: string,
  value: string,
  id: string,
}
export type CategoryNameType = {
  name: string
}

type InitialStateType = {
  categories: Array<CategoryNameType>,
  activeCategory: number,
  productsClothes: Array<ProductType>,
  productsTech: Array<ProductType>,
  productDescription: ProductType,
  cartOrders: Array<ProductType>,
  currentPhotoPdp: string,
  attribute: string,
  toggleCart: boolean,
}

const initialState: InitialStateType = {
  categories: [],
  activeCategory: 0,
  productsClothes: [] as Array<ProductType>,
  productsTech: [],
  productDescription: {
    id: 'string',
    name: 'string',
    inStock: true,
    gallery: [],
    description: 'string',
    category: 'string',
    prices: [],
    brand: 'string',
    attributes: [],
    quantity: 0
  },
  cartOrders: [],
  currentPhotoPdp: '',
  attribute: '',
  toggleCart: false
}

enum CATEGORIES {
  SET_CATEGORIES = 'set-categories',
  SET_ACTIVE_CATEGORY = 'set-active-category',
  GET_PRODUCTS_CLOTHES = 'get-products-clothes',
  GET_PRODUCTS_TECH = 'get-products-tech',
  SET_PRODUCT_DESCRIPTION = 'set-product-description',
  ADD_TO_CART = 'add-to-cart',
  REMOVE_FROM_CART = 'remove-from-cart',
  CHANGE_ACTIVE_PDP_PHOTO = 'change-active-pdp-photo',
  SET_ATTRIBUTE = 'set-attribute',
  SET_TOGGLE_CART = 'set-toggle-cart',
  INC_PRODUCT_QUANTITY = 'inc-products-quantity',
  DEC_PRODUCT_QUANTITY = 'dec-products-quantity',

}

export const categoriesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case CATEGORIES.SET_CATEGORIES:
      return {...state, categories: action.categories}
    case CATEGORIES.SET_ACTIVE_CATEGORY:
      return {...state, activeCategory: action.activeCategory}
    case CATEGORIES.GET_PRODUCTS_CLOTHES:
      return {...state, productsClothes: action.productsClothes}
    case CATEGORIES.GET_PRODUCTS_TECH:
      return {...state, productsTech: action.productsTech}
    case CATEGORIES.SET_PRODUCT_DESCRIPTION:
      return {...state, productDescription: action.productDescription}
    case CATEGORIES.ADD_TO_CART:
      return {...state, cartOrders: [...state.cartOrders, action.cartOrders]}
    case CATEGORIES.REMOVE_FROM_CART:
      return {
        ...state,
        cartOrders: [...state.cartOrders.filter(el => el.id !== action.order)]
      }
    case CATEGORIES.CHANGE_ACTIVE_PDP_PHOTO:
      return {...state, currentPhotoPdp: action.photo}
    case CATEGORIES.SET_ATTRIBUTE:
      return {...state, attribute: action.attr}
    case CATEGORIES.SET_TOGGLE_CART:
      return {...state, toggleCart: action.toggle}
    case CATEGORIES.INC_PRODUCT_QUANTITY:
      return {
        ...state, cartOrders: state.cartOrders.map((pr => pr.id === action.id
          ? {...pr, quantity: ++pr.quantity}
          : pr))
      }
    case CATEGORIES.DEC_PRODUCT_QUANTITY:
      return {
        ...state, cartOrders: state.cartOrders.map((pr => pr.id === action.id
          ? {...pr, quantity: --pr.quantity}
          : pr))
      }
    default :
      return state
  }
}

//actions
export const setCategoriesAC = (categories: Array<CategoryNameType>) => {
  return {
    type: 'set-categories',
    categories: categories
  } as const
}
type SetCategoryACType = ReturnType<typeof setCategoriesAC>

export const setActiveCategoryAC = (activeCategory: number) => {
  return {
    type: 'set-active-category', activeCategory
  } as const
}
type SetActiveCategoryACType = ReturnType<typeof setActiveCategoryAC>

export const getProductsClothesAC = (productsClothes: Array<ProductType>) => {
  return {
    type: 'get-products-clothes',
    productsClothes: productsClothes
  } as const
}
type GetProductsClothesACType = ReturnType<typeof getProductsClothesAC>

export const getProductsTechAC = (productsTech: Array<ProductType>) => {
  return {
    type: 'get-products-tech',
    productsTech: productsTech
  } as const
}
type GetProductsTechACType = ReturnType<typeof getProductsTechAC>

export const setProductDescriptionAC = (productDescription: ProductType) => {
  return {
    type: 'set-product-description',
    productDescription: productDescription
  } as const
}
type SetProductDescriptionACType = ReturnType<typeof setProductDescriptionAC>

export const addToCartAC = (order: ProductType) => {
  return {
    type: 'add-to-cart',
    cartOrders: order
  } as const
}
type addToCartACType = ReturnType<typeof addToCartAC>

export const removeFromCartAC = (order: string) => {
  return {
    type: 'remove-from-cart',
    order: order
  } as const
}
type removeFromCartACType = ReturnType<typeof removeFromCartAC>


export const changeActivePhotoPdpAC = (photo: string) => {
  return {
    type: 'change-active-pdp-photo',
    photo: photo
  } as const
}
type changeActivePhotoPdpACType = ReturnType<typeof changeActivePhotoPdpAC>

export const setAttributeAC = (attr: string) => {
  return {
    type: 'set-attribute',
    attr: attr
  } as const
}
type setAttributeACType = ReturnType<typeof setAttributeAC>

export const setToggleCartAC = (val: boolean) => {
  return {
    type: 'set-toggle-cart',
    toggle: val
  } as const
}
type setToggleCartACType = ReturnType<typeof setToggleCartAC>

export const incProdQuantityAC = (id: string) => {
  return {
    type: 'inc-products-quantity',
    id: id
  } as const
}
type incProdQuantityACType = ReturnType<typeof incProdQuantityAC>

export const decProdQuantityAC = (id: string) => {
  return {
    type: 'dec-products-quantity',
    id: id
  } as const
}
type decProdQuantityACType = ReturnType<typeof decProdQuantityAC>


type ActionsType =
  SetCategoryACType
  | SetActiveCategoryACType
  | GetProductsClothesACType
  | GetProductsTechACType
  | SetProductDescriptionACType
  | addToCartACType
  | removeFromCartACType
  | changeActivePhotoPdpACType
  | setAttributeACType
  | setToggleCartACType
  | incProdQuantityACType
  | decProdQuantityACType

//thunks

export const setCategoriesThunkCreator = () => (dispatch: Dispatch) => {

  const categoriesData = query(new Query(request.getCategories))
  categoriesData.then(
    (res: any) => {
      dispatch(setCategoriesAC(res.categories))
    }
  )
}

export const getProductsThunkCreator = () => (dispatch: Dispatch) => {

  const productsData = query(new Query(request.getProducts))
  productsData.then(
    (res: any) => {
      dispatch(getProductsClothesAC(res.categories[0].products))
      dispatch(getProductsTechAC(res.categories[1].products))
    }
  )
}




