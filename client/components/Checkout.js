import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Checkout(props) {
  if (!props.cart) props.cart = []

  return (
    <div className="marginAll columns">
      <ol className="column is-third">
        {props.cart.length ? (
          props.cart.map(item => {
            return (
              <li className="orderItem box" key={item.id}>
                <h3>Title: {item.book.title}</h3>
                <h5>${item.book.price}</h5>
                <p>quantity: {item.quantity}</p>
              </li>
            )
          })
        ) : (
          <p className="box">Your Cart Is Empty</p>
        )}
        <br />
      </ol>

      <form className="column is-third box">
        <div className="field">
          <div className="control">
            <label htmlFor="firstname" className="label">
              First Name:{' '}
            </label>
            <input name="firstname" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="lastname" className="label">
              Last Name:{' '}
            </label>
            <input name="lastname" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="address" className="label">
              Address:{' '}
            </label>
            <input name="address" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="zipcode" className="label">
              Zip:{' '}
            </label>
            <input name="zipcode" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="city" className="label">
              City:{' '}
            </label>
            <input name="city" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="state" className="label">
              State:{' '}
            </label>
            <input name="state" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="phone" className="label">
              Phone Number:{' '}
            </label>
            <input name="phone" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="country" className="label">
              Country:{' '}
            </label>
            <input name="country" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="child" className="label">
              First Born Child:{' '}
            </label>
            <input name="child" />
          </div>
        </div>
      </form>

      <div className="column box is-third">
        Billing Information Placeholder
        <br />
        <Link to="/confirmation">
          <button type="button" className="button">
            Next Step!
          </button>
        </Link>
      </div>
    </div>
  )
}

const mapState = state => ({
  cart: state.shoppingcart
})

export default connect(mapState)(Checkout)
