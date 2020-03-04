import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/shoppingcart'
import {Link} from 'react-router-dom'

function ShoppingCart(props) {
  // console.log('gimme props', props)
  if (!props.cart) props.cart = []
  useEffect(() => {
    props.loadCart()
  }, [])
  return (
    <div>
      {props.cart.length ? (
        props.cart.map(item => {
          return (
            <li className="orderItem" key={item.id}>
              <h3>Title {item.book.title}</h3>
              <h5>${item.book.price}</h5>
              <p>quantity {item.quantity}</p>
              <form>
                <label htmlFor="quantity">Change Your Quantity: </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="1000"
                  value=""
                />
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
  loadCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(ShoppingCart)
