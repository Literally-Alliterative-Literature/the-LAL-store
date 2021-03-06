import axios from 'axios'
import {REMOVE_USER} from '../store/user'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
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

export const deleteUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/users/${id}`)
      dispatch(getUsers(data))
    } catch (err) {
      console.log('Something went wrong inside deleteUser! Err is: ', err)
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
    case REMOVE_USER:
      return []
    default:
      return state
  }
}
