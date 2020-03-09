import axios from 'axios'
import history from '../history'

const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'

const defaultBook = []

const getSingleBook = book => ({
  type: GET_SINGLE_BOOK,
  book
})

export const fetchSingleBook = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/books/${id}`)
      dispatch(getSingleBook(data))
    } catch (err) {
      console.log('Something went wrong inside fetchSingleBook! Err is: ', err)
    }
  }
}

export const addReview = (id, review, rating) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/books/${id}`, {review, rating})
      dispatch(getSingleBook(data))
    } catch (err) {
      console.log('Something went wrong inside addReview! Err is: ', err)
    }
  }
}

export default function(state = defaultBook, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return action.book
    default:
      return state
  }
}
