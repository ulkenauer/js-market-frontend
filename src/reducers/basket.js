import _ from 'lodash'
const defaultState = {
    frozen: null,
    products: [],
    total: null
}

const basket = (state = defaultState, action) => {

    switch (action.type) {
        case 'REQUEST_BASKET': {
            let newState = _.cloneDeep(state)
            return newState
        }
        case 'FAILED_REQUEST_BASKET': {
            let newState = _.cloneDeep(state)
            return newState
        }
        case 'RECEIVE_BASKET': {
            let newState = _.cloneDeep(state)
            console.log(newState)
            newState.total = action.total
            newState.frozen = action.frozen
            newState.products = [...action.products]
            return newState
        }
        default:
            return state
    }
}

export default basket