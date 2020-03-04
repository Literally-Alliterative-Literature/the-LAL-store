import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchCart, editQuantity} from '../store/shoppingcart'
import {Link} from 'react-router-dom'

function ShoppingCart(props) {
  // console.log('gimme props', props)
  const handleQuantityClick = (event, itemId) => {
    event.preventDefault()
    props.editQuantity(itemId, event.target.quantity.value)
  }
  if (!props.cart) props.cart = []
  useEffect(() => {
    props.loadCart()
  }, [])
  return (
    <div>
      {props.cart.length ? (
        props.cart.map(item => {
          console.log('gimme item', item)
          return (
            <li className="orderItem" key={item.id}>
              <h3>Title {item.book.title}</h3>
              <h5>${item.book.price}</h5>
              <p>quantity {item.quantity}</p>
              <form onSubmit={event => handleQuantityClick(event, item.id)}>
                <input className="form-control" type="number" name="quantity" />
                <button type="submit">Change Quantity</button>
              </form>
              <img src={item.book.imageUrl} />
            </li>
          )
        })
      ) : (
        <h2>No items in cart</h2>
      )}
    </div>
  )
}

const mapState = state => ({
  cart: state.shoppingcart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  editQuantity: (orderItemId, quantity) =>
    dispatch(editQuantity(orderItemId, quantity))
})

export default connect(mapState, mapDispatch)(ShoppingCart)
