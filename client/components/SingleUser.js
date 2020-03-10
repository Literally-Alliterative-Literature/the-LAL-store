import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editUser} from '../store'

function SingleUser(props) {
  const [editForm, setEditForm] = useState(false)
  const [editedUser, setEdited] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    const userEditInfo = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      address: event.target.address.value,
      userId: event.target.userId.value || false
    }
    props.editUserData(userEditInfo)
    setEdited(true)
  }

  return (
    <div>
      <h2>Welcome, {props.user.name}</h2>
      <h4>Email: {props.user.email}</h4>
      <h4>Billing Address: {props.user.address}</h4>
      <h4>
        <Link to="/books/2">
          Read our bestselling steamy romance series here!
        </Link>
      </h4>
      <button
        className="button is-primary"
        type="button"
        onClick={() => setEditForm(!editForm)}
      >
        I want to edit my information
      </button>
      {editForm ? (

        <>
          <form onSubmit={handleSubmit}>
            {props.adminAccess ? (
              <div className="field">
                <label className="label" htmlFor="id">
                  User ID:
                </label>
                <div className="control">
                  <input type="number" name="userId" className="input" />
                </div>
              </div>
            ) : (
              false
            )}

            <div className="field">
              <label className="label" htmlFor="name">
                Edit Name:
              </label>
              <div className="control">
                <input type="text" name="name" />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="email">
                Edit Email:
              </label>
              <div className="control">
                <input type="email" name="email" />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Edit Password:
              </label>
              <div className="control">
                <input type="text" name="password" />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="address">
                Edit Address:
              </label>
              <div className="control">
                <input type="text" name="address" />
              </div>
            </div>

            <button type="submit" className="button is-primary">
              Submit
            </button>
          </form>
        </>
      ) : (
        false
      )}
      {editedUser ? <div>User Edited!</div> : false}
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  adminAccess: state.user.adminAccess
})

const mapDispatch = dispatch => ({
  editUserData: userInfo => dispatch(editUser(userInfo))
})

export default connect(mapState, mapDispatch)(SingleUser)
