import _ from 'lodash'
const defaultState = {
    pages: {},
    maxPage: 1,
    fixedLastPage: false
}

const products = (state = defaultState, action) => {

  switch (action.type) {
    case 'INVALIDATE_PRODUCTS': {
        let newState = _.cloneDeep(defaultState)
        return newState
    }
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