import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/shoppingcart'
import {Link} from 'react-router-dom'

function ShoppingCart(props) {
  console.log('gimme props', props)
  if (!props.cart) props.cart = []
  useEffect(() => {
    props.loadCart(1)
  }, [])
  return (
    <div>
      {props.cart.length ? (
        props.cart.map(item => {
          return (
            <li className="orderItem" key={item.id}>
              <h3>{item.name}</h3>
              <h5>{item.price}</h5>
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
  cart: state.cartArray
})

const mapDispatch = dispatch => ({
  loadCart: userId => dispatch(fetchCart(userId))
})

export default connect(mapState, mapDispatch)(ShoppingCart)
