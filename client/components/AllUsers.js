import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allusers'

function AllUsers(props) {
  if (!props.users) props.user = []
  useEffect(() => {
    props.loadUsers()
  }, [])
  return (
    <div>
      {props.users.length
        ? props.users.map(user => {
            return (
              <div className="allUsers" key={user.id}>
                <h3>id : {user.id}</h3>
                <h3>email : {user.email}</h3>
              </div>
            )
          })
        : false}
    </div>
  )
}

const mapState = state => ({
  users: state.allusers
})
const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)
