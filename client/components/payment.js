import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import React from 'react'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_eDWdNiWAVwSxY3iGhC6pEvHO00A64pBByv')

const Payment = () => {
  return <Elements stripe={stripePromise}>{/* <MyCheckoutForm /> */}</Elements>
}

export default Payment
