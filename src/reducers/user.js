import _ from 'lodash'
import {SET_TOKEN, INVALIDATE_TOKEN, REQUEST_IDENTITY, FAILED_REQUEST_IDENTITY, RECEIVE_IDENTITY} from '../actions'
const defaultState = {
  phone: null,
  token: null
}

const user = (state = defaultState, action) => {

  switch (action.type) {
    case SET_TOKEN: {
      let newState = _.cloneDeep(state)
      newState.token = action.token
      return newState
    }
    case INVALIDATE_TOKEN: {
      let newState = _.cloneDeep(state)
      newState.phone = null
      newState.token = null
      return newState
    }
    case REQUEST_IDENTITY: {
      let newState = _.cloneDeep(state)
      newState.phone = ''
      return newState
    }
    case FAILED_REQUEST_IDENTITY: {
      let newState = _.cloneDeep(state)
      newState.phone = ''
      return newState
    }
    case RECEIVE_IDENTITY: {
      let newState = _.cloneDeep(state)
      newState.phone = action.phone
      return newState
    }
    default:
      return state
  }
}

export default user