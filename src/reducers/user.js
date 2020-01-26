import _ from 'lodash'
const defaultState = {
  phone: null,
  token: null
  //token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijg5MTMxNzE5NDA4IiwiaWF0IjoxNTc5OTQ2MDA1LCJleHAiOjE1ODI1MzgwMDUsImF1ZCI6IkNsaWVudF9JZGVudGl0eSIsImlzcyI6IkF1dGhvcml6YXh0aW9uL1Jlc291cmNlL1RoaXMgc2VydmVyIiwic3ViIjoiaWFtQHVzZXIubWUifQ.a7ewdJncgpIHoduhftFvkGuCVYwPYimu3omOkZhVtBZDsaT2YvhkNq3W1jeidglhTriWBLmM9Jm91NQ1k9u41Q"
}

const user = (state = defaultState, action) => {

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
    case 'SET_TOKEN': {
      let newState = _.cloneDeep(state)
      newState.token = action.token
      return newState
    }
    case 'INVALIDATE_TOKEN': {
      let newState = _.cloneDeep(state)
      newState.phone = null
      newState.token = null
      return newState
    }
    case 'REQUEST_IDENTITY': {
      let newState = _.cloneDeep(state)
      newState.phone = action.phone
      return newState
    }
    case 'FAILED_REQUEST_IDENTITY': {
      let newState = _.cloneDeep(state)
      newState.phone = action.phone
      return newState
    }
    case 'RECEIVE_IDENTITY': {
      let newState = _.cloneDeep(state)
      console.log(newState)
      newState.phone = action.phone
      return newState
    }
    default:
      return state
  }
}

export default user