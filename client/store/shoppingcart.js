import axios from 'axios'

const GET_CART = 'GET_CART'

const defaultCart = []

const getCart = cart => ({
  type: GET_CART,
  cart
})

export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      console.log('gimme data', data)
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
    default:
      return state
  }
}
