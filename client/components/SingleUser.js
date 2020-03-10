import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function SingleUser(props) {
  return (
    <div className="card">
      <h2>Welcome, {props.user.name}</h2>
      <h4>Email: {props.user.email}</h4>
      <h4>Billing Address: {props.user.address}</h4>
      <h4>
        <Link to="/books/2">
          Read our bestselling steamy romance series here!
        </Link>
      </h4>
      <button className="button is-primary" type="button">
        <Link to={`/editUser/${props.user.id}`}>Edit my Information</Link>
      </button>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(SingleUser)
