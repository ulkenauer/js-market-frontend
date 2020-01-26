import { combineReducers } from 'redux'
import user from './user'
import basket from './basket'
import products from './products'

export default combineReducers({
  user,
  basket,
  products
})