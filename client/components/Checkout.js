import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Checkout(props) {
  if (!props.cart) props.cart = []

  return (
    <div>
      <ol>
        {props.cart.length ? (
          props.cart.map(item => {
            return (
              <li className="orderItem" key={item.id}>
                <h3>Title: {item.book.title}</h3>
                <h5>${item.book.price}</h5>
                <p>quantity: {item.quantity}</p>
              </li>
            )
          })
        ) : (
          <p>Your Cart Is Empty</p>
        )}
      </ol>
      <form>
        <label htmlFor="firstname">First Name: </label>
        <input name="firstname" />
        <label htmlFor="lastname">Last Name: </label>
        <input name="lastname" />
        <label htmlFor="address">Address: </label>
        <input name="address" />
        <label htmlFor="zipcode">Zip: </label>
        <input name="zipcode" />
        <label htmlFor="city">City: </label>
        <input name="city" />
        <label htmlFor="state">State: </label>
        <input name="state" />
        <label htmlFor="phone">phone: </label>
        <input name="phone" />
        <label htmlFor="country">Country: </label>
        <input name="country" />
        <label htmlFor="child">First Born Child: </label>
        <input name="child" />
        <p>Billing Information Placeholder</p>
      </form>
      <Link to="/confirmation">Next Step</Link>
    </div>
  )
}

const mapState = state => ({
  cart: state.shoppingcart
})

export default connect(mapState)(Checkout)
