import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store/user'
import {fetchUserForAdmin} from '../store/adminUser'

function EditUser(props) {
  const [userEdited, setEdited] = useState(false)

  useEffect(() => {
    props.loadSingleUser(props.match.params.id)
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      address: event.target.address.value
    }
    props.editUser(props.match.params.id, user)
    setEdited(true)
    props.loadSingleUser(props.match.params.id)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <label className="label" htmlFor="name">
            Edit Name:
          </label>
          <p className="help">Old Name: {props.user.name}</p>
          <input type="text" name="name" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="email">
            Edit Email:
          </label>
          <p className="help">Old Email: {props.user.email}</p>
          <input type="email" name="email" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="password">
            Edit Password:
          </label>
          <input type="text" name="password" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="address">
            Edit Address:
          </label>
          <p className="help">Old Address: {props.user.address}</p>
          <input type="text" name="address" />
        </div>
      </div>

      <div className="control">
        <button type="submit" className="button is-primary">
          Submit
        </button>
      </div>
      {userEdited ? <div>User Edited!</div> : false}
    </form>
  )
}

const mapState = state => ({
  user: state.adminUser
})

const mapDispatch = dispatch => ({
  editUser: (id, user) => dispatch(editUser(id, user)),
  loadSingleUser: id => dispatch(fetchUserForAdmin(id))
})

export default connect(mapState, mapDispatch)(EditUser)
