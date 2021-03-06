import {categoriesReducer, setActiveCategoryAC, setCategoriesAC} from "./categories-reducer";

type InitialStateType = {
  categories: Array<any>,
  activeCategory: boolean,
}

let startState: InitialStateType
beforeEach(() => {
  startState = {
    categoriesName: [],
    activeCategory: false,
  }
})
test(('Categories reducer should work correctly'), () => {
  const actionSetCategories = setCategoriesAC(['name', 'category'])
  const endState1 = categoriesReducer(startState, actionSetCategories)

  const actionSetActiveCategories = setActiveCategoryAC(true)
  const endState2 = categoriesReducer(startState, actionSetActiveCategories)

  expect(endState1.categoriesName).toStrictEqual(['name', 'category'])
  expect(endState1.categoriesName[0]).toBe('name')
  expect(endState2.activeCategory).toBe(true)

})

