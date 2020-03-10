import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

/**
 * INITIAL STATE
 */

const defaultHistory = []

/**
 * ACTION CREATORS
 */

const getOrderHistory = orderHistory => ({
  type: GET_ORDER_HISTORY,
  orderHistory
})

/**
 * THUNK CREATORS
 */

export const fetchOrderHistory = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart/orderhistory')
    console.log('data is: ', data)
    dispatch(getOrderHistory(data))
  } catch (err) {
    console.log('Something went wrong in fetchOrderHistory. Err is: ', err)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultHistory, action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orderHistory
    default:
      return state
  }
}
