import {query, request} from "../../dal/apiRequest";
import {Query} from "@tilework/opus";
import {Dispatch} from "redux";

type InitialStateType = {
  categories: Array<any>,
  activeCategory: boolean,
}

const initialState: InitialStateType = {
  categories: [],
  activeCategory: false,
}


export const categoriesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'set-categories':
      return {...state, categories: action.categories}
    case 'set-active-category':
      return {...state, activeCategory: true}
    default :
      return state
  }
}

//actions
export const setCategoriesAC = (categories: Array<any>) => ({type: 'set-categories', categories} as const)
type SetCategoryACType = ReturnType<typeof setCategoriesAC>

export const setActiveCategoryAC = (activeCategory: boolean) => ({type: 'set-active-category', activeCategory} as const)
type SetActiveCategoryACType = ReturnType<typeof setActiveCategoryAC>

type ActionsType = SetCategoryACType | SetActiveCategoryACType

//thunks


export const setCategoriesThunkCreator = () => (dispatch: Dispatch) => {

  const categoriesData = query(new Query(request.getCategories))
  categoriesData.then(
    (res: any) => { //Add type later
      dispatch(setCategoriesAC(res.categories))
    }
  )
}


