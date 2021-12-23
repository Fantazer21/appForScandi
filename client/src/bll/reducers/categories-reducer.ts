import {query, request} from "../../dal/apiRequest";
import {Query} from "@tilework/opus";
import {Dispatch} from "redux";

export type ProductsType = {
  id: string
  name: string
  inStock: boolean
  gallery: Array<string>
  description: string
  category: string
  prices: Array<any>
  brand: string
  attributes: AttributeSetType[]
}

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
  productsClothes: Array<ProductsType>,
  productsTech: Array<ProductsType>,
  productDescription: ProductsType,
  cartOrders: Array<ProductsType>,
  currentPhotoPdp: string,
  attribute: string
}

const initialState: InitialStateType = {
  categories: [],
  activeCategory: 0,
  productsClothes: [] as Array<ProductsType>,
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
  },
  cartOrders: [],
  currentPhotoPdp: '',
  attribute: '',
}

export const categoriesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'set-categories':
      return {...state, categories: action.categories}
    case 'set-active-category':
      return {...state, activeCategory: action.activeCategory}
    case 'get-products-clothes':
      return {...state, productsClothes: action.productsClothes}
    case 'get-products-tech':
      return {...state, productsTech: action.productsTech}
    case 'set-product-description':
      return {...state, productDescription: action.productDescription}
    case 'add-to-cart':
      return {...state, cartOrders: [...state.cartOrders, action.cartOrders]}
    case 'remove-from-cart':
      return {
        ...state,
        cartOrders: [...state.cartOrders.filter(el => el.id === action.order).slice(0, -1), ...state.cartOrders.filter(el => el.id !== action.order)]
      }
    case 'change-active-pdp-photo':
      return {...state, currentPhotoPdp: action.photo}
    case "set-attribute":
      return {...state, attribute: action.attr }
    default :
      return state
  }
}

//actions
export const setCategoriesAC = (categories: Array<CategoryNameType>) => ({
  type: 'set-categories',
  categories: categories
} as const)
type SetCategoryACType = ReturnType<typeof setCategoriesAC>

export const setActiveCategoryAC = (activeCategory: number) => ({type: 'set-active-category', activeCategory} as const)
type SetActiveCategoryACType = ReturnType<typeof setActiveCategoryAC>

export const getProductsClothesAC = (productsClothes: Array<ProductsType>) => ({
  type: 'get-products-clothes',
  productsClothes: productsClothes
} as const)
type GetProductsClothesACType = ReturnType<typeof getProductsClothesAC>

export const getProductsTechAC = (productsTech: Array<ProductsType>) => ({
  type: 'get-products-tech',
  productsTech: productsTech
} as const)
type GetProductsTechACType = ReturnType<typeof getProductsTechAC>

export const setProductDescriptionAC = (productDescription: ProductsType) => ({
  type: 'set-product-description',
  productDescription: productDescription
} as const)
type SetProductDescriptionACType = ReturnType<typeof setProductDescriptionAC>

export const addToCartAC = (order: ProductsType) => ({
  type: 'add-to-cart',
  cartOrders: order
} as const)
type addToCartACType = ReturnType<typeof addToCartAC>

export const removeFromCartAC = (order: string) => ({
  type: 'remove-from-cart',
  order: order
} as const)
type removeFromCartACType = ReturnType<typeof removeFromCartAC>


export const changeActivePhotoPdpAC = (photo: string) => ({
  type: 'change-active-pdp-photo',
  photo: photo
} as const)
type changeActivePhotoPdpACType = ReturnType<typeof changeActivePhotoPdpAC>

export const setAttributeAC = (attr: string) => ({
  type: 'set-attribute',
  attr: attr
} as const)
type setAttributeACType = ReturnType<typeof setAttributeAC>

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

//thunks


export const setCategoriesThunkCreator = () => (dispatch: Dispatch) => {

  const categoriesData = query(new Query(request.getCategories))
  categoriesData.then(
    (res: any) => { //Add type later
      dispatch(setCategoriesAC(res.categories))
    }
  )
}

export const getProductsThunkCreator = () => (dispatch: Dispatch) => {

  const productsData = query(new Query(request.getProducts))
  productsData.then(
    (res: any) => { //Add type later
      console.log(res.categories)
      dispatch(getProductsClothesAC(res.categories[0].products))
      dispatch(getProductsTechAC(res.categories[1].products))
    }
  )
}




