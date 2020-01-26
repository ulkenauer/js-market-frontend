import _ from 'lodash'
const defaultState = {
    pages: {},
    maxPage: 1,
    fixedLastPage: false
}

const products = (state = defaultState, action) => {

  switch (action.type) {
    /* case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      ) */
    case 'REQUEST_PRODUCTS': {
        let newState = _.cloneDeep(state)
        newState.pages[action.page] = { status: 'loading', products: [] }
        return newState
    }
    case 'RECEIVE_PRODUCTS': {
          let newState = _.cloneDeep(state)
          if (action.pageProducts.length === 0) {
            newState.pages[action.page] = { status: 'empty', products: action.pageProducts }
          } else {
              newState.pages[action.page] = { status: 'loaded', products: action.pageProducts }
          }
          if (action.page >= newState.maxPage) {
              if (action.pageProducts.length === 20) {
                newState.maxPage = action.page + 1
              } else {
                newState.fixedLastPage = true
                if (action.pageProducts.length === 0) {
                    if ((action.page - 1) in newState.pages) {
                        newState.maxPage = action.page - 1
                    }
                }
              }
          }
        return newState
    }
    default:
      return state
  }
}

export default products