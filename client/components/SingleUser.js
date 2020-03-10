import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editUser} from '../store'
import {fetchOrderHistory} from '../store/orderHistory'

function SingleUser(props) {
  const [editForm, setEditForm] = useState(false)
  const [editedUser, setEdited] = useState(false)

  useEffect(() => {
    props.loadOrderHistory()
  }, [])

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
    <div className="columns">
      <div className="card column is-half">
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
      <div className="card column is-half">
        <h2 className="title">Order History</h2>
        {props.orderHistory.length ? (
          props.orderHistory.map(order => {
            return (
              <ol className="content" key={order.id}>
                <li className="marginLeft">
                  Order {order.id} from {parseOrderUpdate(order.updatedAt)}:
                  <ul>
                    {order.orderItems.map(orderItem => {
                      return (
                        <li
                          key={`${orderItem.book.title}OI${orderItem.book.id}`}
                        >
                          <h4>Title: {orderItem.book.title}</h4>
                          <h4>Amount Purchased: {orderItem.quantity}</h4>
                          <h4>Price per Item: {orderItem.currentPrice}</h4>
                          <h4>
                            Total for this book:{' '}
                            {orderItem.currentPrice * 1 +
                              orderItem.quantity * 1}
                          </h4>
                          <br />
                        </li>
                      )
                    })}
                  </ul>
                </li>
              </ol>
            )
          })
        ) : (
          <p>
            You have no history of purchased items! You need to be logged in and
            have a purchase history to see this feature!
          </p>
        )}
      </div>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  adminAccess: state.user.adminAccess,
  orderHistory: state.orderHistory
})

const mapDispatch = dispatch => ({
  editUserData: userInfo => dispatch(editUser(userInfo)),
  loadOrderHistory: () => dispatch(fetchOrderHistory())
})

export default connect(mapState, mapDispatch)(SingleUser)

const parseOrderUpdate = dateString => {
  let resultArr = dateString.split('-')
  let secondResult = resultArr[2].split('T')
  const resultString = resultArr[0] + '-' + resultArr[1] + '-' + secondResult[0]
  return resultString
}
