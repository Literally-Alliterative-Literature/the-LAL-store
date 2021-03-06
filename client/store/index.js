import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allbooks from './allbooks'
import singleBook from './singleBook'
import shoppingcart from './shoppingcart'
import allusers from './allusers'
import totalpages from './totalPages'
import orderHistory from './orderHistory'
import adminUser from './adminUser'

const reducer = combineReducers({
  user,
  allbooks,
  singleBook,
  shoppingcart,
  allusers,
  totalpages,
  orderHistory,
  adminUser
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
