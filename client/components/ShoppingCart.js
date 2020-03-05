import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchCart, editQuantity, deleteItem} from '../store/shoppingcart'
import {Link} from 'react-router-dom'

function ShoppingCart(props) {
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
    <div>
      <Link to="/checkout">Checkout</Link>
      <ol>
        {props.cart.length ? (
          props.cart.map(item => {
            return (
              <li className="orderItem" key={item.id}>
                <h3>Title: {item.book.title}</h3>
                <h5>${item.book.price}</h5>
                <p>quantity: {item.quantity}</p>
                <form onSubmit={event => handleQuantityClick(event, item.id)}>
                  <input
                    className="form-control"
                    type="number"
                    name="quantity"
                    min="1"
                    max="1000"
                  />
                  <button type="submit">Change Quantity</button>
                </form>
                <img src={item.book.imageUrl} />
                <button type="button" onClick={() => handleDelete(item.id)}>
                  Remove From Cart
                </button>
              </li>
            )
          })
        ) : (
          <h2>No items in cart</h2>
        )}
      </ol>
      <Link to="/checkout">Checkout</Link>
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
