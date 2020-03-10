import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrderHistory} from '../store/orderHistory'

function SingleUser(props) {
  useEffect(() => {
    props.loadOrderHistory()
  }, [])

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
        <button className="button is-primary" type="button">
          <Link to={`/editUser/${props.user.id}`}>Edit my Information</Link>
        </button>
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
  orderHistory: state.orderHistory
})

const mapDispatch = dispatch => ({
  loadOrderHistory: () => dispatch(fetchOrderHistory())
})

export default connect(mapState, mapDispatch)(SingleUser)

const parseOrderUpdate = dateString => {
  let resultArr = dateString.split('-')
  let secondResult = resultArr[2].split('T')
  const resultString = resultArr[0] + '-' + resultArr[1] + '-' + secondResult[0]
  return resultString
}
