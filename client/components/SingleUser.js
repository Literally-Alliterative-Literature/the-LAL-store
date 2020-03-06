import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

function SingleUser(props) {
  const [editForm, setEditForm] = useState(false)
  return (
    <div>
      <h2>Welcome, {props.user.name}</h2>
      <button type="button" onClick={() => setEditForm(!editForm)}>
        I want to edit my information
      </button>
      {editForm ? (
        <form>
          <label htmlFor="name">Edit Name:</label>
          <input type="text" name="name" />
          <label htmlFor="email">Edit Email:</label>
          <input type="email" name="email" />
          <label htmlFor="password">Edit Password:</label>
          <input type="text" name="password" />
          <label htmlFor="address">Edit Address:</label>
          <input type="text" name="address" />
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

// const mapDispatch = dispatch => ({

// })

export default connect(mapState)(SingleUser)
