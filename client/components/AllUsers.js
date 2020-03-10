import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteUser} from '../store/allusers'

function AllUsers(props) {
  if (!props.users) props.user = []
  useEffect(() => {
    props.loadUsers()
  }, [])

  const handleEdit = event => {}

  const handleDelete = id => {
    props.deleteUser(id)
  }

  return (
    <div>
      <h2>All Users</h2>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Admin?</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {props.users.length ? (
            props.users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  {user.adminAccess ? <td>yes</td> : <td>no</td>}
                  <td>
                    <button type="button" onClick={handleEdit}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(user.id)}>
                      X
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapState = state => ({
  users: state.allusers
})
const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchUsers()),
  deleteUser: id => dispatch(deleteUser(id))
})

export default connect(mapState, mapDispatch)(AllUsers)
