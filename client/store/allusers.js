import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const ADD_USER = 'ADD_USER'
/**
 * INITIAL STATE
 */
const defaultUsers = []
/**
 * ACTION CREATORS
 */
const getUsers = users => ({
  type: GET_USERS,
  users
})
const addUser = user => ({
  type: ADD_USER,
  user
})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getUsers(data))
    } catch (err) {
      console.log(('Something went wrong inside fetchUsers! Err is: ', err))
    }
  }
}
export const sendSingleUser = user => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/users', user)
      dispatch(addUser(data))
    } catch (err) {
      console.log(('Something went wrong inside addUser! Err is: ', err))
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case 'REMOVE_USER':
      return []
    case ADD_USER:
      return [...state, action.user]
    default:
      return state
  }
}
