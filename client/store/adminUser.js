import axios from 'axios'

const GET_USER_FOR_ADMIN = 'GET_USER_FOR_ADMIN'

const defaultUser = {}

const getUserForAdmin = user => ({type: GET_USER_FOR_ADMIN, user})

export const fetchUserForAdmin = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      dispatch(getUserForAdmin(data))
    } catch (err) {
      console.log(
        'Something went wrong inside fetchUserForAdmin! Err is: ',
        err
      )
    }
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_FOR_ADMIN:
      return action.user
    default:
      return state
  }
}
