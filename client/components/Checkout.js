import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Checkout(props) {
  if (!props.cart) props.cart = []

  return (
    <div className="columns">
      <ol className="column is-half">
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
        <br />
        <p>Billing Information Placeholder</p>
      </ol>
      <form className="column is-half">
        <div className="field">
          <label htmlFor="firstname" className="label">
            First Name:{' '}
          </label>
          <div className="control">
            <input name="firstname" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="lastname" className="label">
            Last Name:{' '}
          </label>
          <div className="control">
            <input name="lastname" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="address" className="label">
            Address:{' '}
          </label>
          <div className="control">
            <input name="address" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="zipcode" className="label">
            Zip:{' '}
          </label>
          <div className="control">
            <input name="zipcode" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="city" className="label">
            City:{' '}
          </label>
          <div className="control">
            <input name="city" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="state" className="label">
            State:{' '}
          </label>
          <div className="control">
            <input name="state" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="phone" className="label">
            Phone Number:{' '}
          </label>
          <div className="control">
            <input name="phone" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="country" className="label">
            Country:{' '}
          </label>
          <div className="control">
            <input name="country" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="child" className="label">
            First Born Child:{' '}
          </label>
          <div className="control">
            <input name="child" />
          </div>
        </div>
      </form>
      <Link to="/confirmation">
        <button type="button" className="button">
          Next Step!
        </button>
      </Link>
    </div>
  )
}

const mapState = state => ({
  cart: state.shoppingcart
})

export default connect(mapState)(Checkout)
