import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'

/**
 * INITIAL STATE
 */
const defaultBooks = []

/**
 * ACTION CREATORS
 */
const getBooks = books => ({
  type: GET_BOOKS,
  books
})

/**
 * THUNK CREATORS
 */

export const fetchBooks = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/books')
      dispatch(getBooks(data))
    } catch (err) {
      console.log('Something went wrong inside fetchBooks! Err is: ', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultBooks, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    default:
      return state
  }
}