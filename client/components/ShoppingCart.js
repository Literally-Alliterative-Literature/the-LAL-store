import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchCart, editQuantity, deleteItem} from '../store/shoppingcart'
import {Link} from 'react-router-dom'

function ShoppingCart(props) {
  let total = 0
  if (props.cart.length) {
    props.cart.map(item => {
      total += parseInt(item.book.price, 10) * item.quantity
    })
  }
  const handleQuantityClick = (event, itemId) => {
    event.preventDefault()
    if (!event.target.quantity.value) return
    props.editQuantity(itemId, event.target.quantity.value)
  }
  const handleDelete = itemId => {
    props.removeOrderItem(itemId)
  }
  if (!props.cart) props.cart = []
  useEffect(() => {
    props.loadCart()
  }, [])
  return (
    <div className="tile is-ancestor">
      <ol>
        {props.cart.length ? (
          props.cart.map(item => {
            return (
              <li className="tile is-parent is-9 box" key={item.id}>
                <div className="tile is-child has-text-centered">
                  <h3 className="subtitle">Title: {item.book.title}</h3>
                  <p className="subtitle">Author: {item.book.author}</p>
                  <h5 className="content">
                    Price per item: ${item.book.price}
                  </h5>
                </div>
                <div className="tile is-child has-text-centered">
                  <p className="content">quantity: {item.quantity}</p>
                  <form
                    className="content"
                    onSubmit={event => handleQuantityClick(event, item.id)}
                  >
                    <input
                      className="form-control"
                      type="number"
                      name="quantity"
                      min="1"
                      max="1000"
                    />
                    <button
                      className="button is-warning is-inverted"
                      type="submit"
                    >
                      Change Quantity
                    </button>
                  </form>
                  <p>Total price: ${item.quantity * item.book.price}</p>
                </div>
                <div className="tile is-child">
                  <img src={item.book.imageUrl} />
                  <button
                    type="button"
                    className="delete is-medium"
                    onClick={() => handleDelete(item.id)}
                  >
                    {/* Remove From Cart */}
                  </button>
                </div>
              </li>
            )
          })
        ) : (
          <h2>No items in cart</h2>
        )}
      </ol>
      <div className="card marginTop">
        <h3 className="title">Your complete total is: {total}</h3>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  )
}

const mapState = state => ({
  cart: state.shoppingcart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  editQuantity: (orderItemId, quantity) =>
    dispatch(editQuantity(orderItemId, quantity)),
  removeOrderItem: itemId => dispatch(deleteItem(itemId))
})

export default connect(mapState, mapDispatch)(ShoppingCart)
