import _ from 'lodash'
const defaultState = {
    frozen: null,
    products: [],
    total: null,
    pendingRequest: false
}

const basket = (state = defaultState, action) => {

    switch (action.type) {
        case 'REQUEST_BASKET': {
            let newState = _.cloneDeep(state)
            newState.pendingRequest = true
            return newState
        }
        case 'FAILED_RECEIVE_BASKET': {
            let newState = _.cloneDeep(state)
            newState.pendingRequest = false
            return newState
        }
        case 'RECEIVE_BASKET': {
            let newState = _.cloneDeep(state)
            newState.pendingRequest = false
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