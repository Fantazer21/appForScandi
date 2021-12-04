export type InitialStateType = {
  test_status: string
}

export const initialState: InitialStateType = {
  test_status: 'Test_message'
}

export const testReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'test-case':
      return {...state, test_status: 'new_test_message'}
    default :
      return state
  }
}

//actions
export const testCaseAC = (test_status: string) => ({type: 'test-case', test_status} as const)
//thunks


type ActionsType = ReturnType<typeof testCaseAC>