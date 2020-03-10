import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editUser} from '../store'

function SingleUser(props) {
  const [editForm, setEditForm] = useState(false)
  const handleSubmit = event => {
    event.preventDefault()
    const userEditInfo = {
      name: event.target.name.value || props.user.name,
      email: event.target.email.value || props.user.email,
      password: event.target.password.value || false,
      address: event.target.address.value || props.user.address
    }
    props.editUserData(userEditInfo)
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
      <button type="button" onClick={() => setEditForm(!editForm)}>
        I want to edit my information
      </button>
      {editForm ? (
        <form onSubmit={handleSubmit} className="form-horizontal">
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
          <input type="submit" name="submit" />
        </form>
      ) : (
        false
      )}
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  editUserData: userInfo => dispatch(editUser(userInfo))
})

export default connect(mapState, mapDispatch)(SingleUser)
