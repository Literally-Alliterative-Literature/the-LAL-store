import React, {useState} from 'react'
import {connect} from 'react-redux'
import {purchaseCart} from '../store/shoppingcart'

function Confirmation(props) {
  const [purchased, setpurchased] = useState(false)
  const handlePurchase = () => {
    props.loadPurchase()
    setpurchased(true)
  }
  let total = 0
  if (props.cart.length) {
    props.cart.map(book => {
      total += book.currentPrice * book.quantity
    })
  }
  return (
    <div>
      {purchased ? (
        <h1>Thank you for your purchase.</h1>
      ) : (
        <div>
          <p>Are you sure you want to make this purchase?</p>
          <p>Total is: ${total}</p>
          <button type="button" onClick={handlePurchase}>
            Confirm my purchase
          </button>
        </div>
      )}
    </div>
  )
}

const mapState = state => ({
  cart: state.shoppingcart
})

const mapDispatch = dispatch => ({
  loadPurchase: () => dispatch(purchaseCart())
})

export default connect(mapState, mapDispatch)(Confirmation)
