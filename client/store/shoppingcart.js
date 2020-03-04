import axios from 'axios'

const GET_CART = 'GET_CART'
const GET_UPDATED_QUANTITY = 'GET_UPDATED_QUANTITY'
const defaultCart = []

const getCart = cart => ({
  type: GET_CART,
  cart
})

const gotQuantityChange = (quantity, orderItemId) => ({
  type: GET_UPDATED_QUANTITY,
  quantity,
  orderItemId
})

export const addToCart = (book, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', {book, quantity})
      dispatch(getCart(data))
    } catch (err) {
      console.log('Something went wrong inside addToCart! Err is, ', err)
    }
  }
}

export const editQuantity = (orderItemId, quantity) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart', {quantity, orderItemId})
      dispatch(gotQuantityChange(quantity, orderItemId))
    } catch (err) {
      console.log('Something went wrong inside editQuantity! Err is, ', err)
    }
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (err) {
      console.log('Something went wrong inside of fetchCart! Err is: ', err)
    }
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case GET_UPDATED_QUANTITY:
      return state.map(orderItem => {
        if (orderItem.id === action.orderItemId) {
          orderItem.quantity = action.quantity
        }
        return orderItem
      })
    default:
      return state
  }
}
