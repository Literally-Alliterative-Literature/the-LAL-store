import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchSingleBook} from '../store/singleBook'
import {addToCart} from '../store/shoppingcart'

function SingleBook(props) {
  const [toCart, setToCart] = useState(false)
  const handleClick = event => {
    event.preventDefault()
    setToCart(true)
    if (!event.target.quantity.value) event.target.quantity.value = 1
    props.handleAddToCart(props.book, event.target.quantity.value)
  }

  if (!props.book) props.book = []
  useEffect(() => {
    props.loadSingleBook(props.match.params.id)
  }, [])
  if (!props.book.reviews) props.book.reviews = []
  return (
    <div>
      <h2>{props.book.title}</h2>
      <h3>{props.book.author}</h3>
      <img src={props.book.imageUrl} />
      <p>{props.book.genre}</p>
      <p>{props.book.synopsis}</p>
      <p>{props.book.price}</p>
      <p>{props.book.ratings}</p>
      <form onSubmit={handleClick}>
        <input
          className="form-control"
          type="number"
          name="quantity"
          min="0"
          max="1000"
        />
        <button className="button is-danger is-outlined" type="submit">
          Add To Cart
        </button>
      </form>
      {toCart ? <p>Item added to cart</p> : false}
      <h3>Reviews</h3>
      {!props.book.reviews.length ? (
        <p>No Reviews</p>
      ) : (
        props.book.reviews.map(review => (
          <div key={review.id} className="review">
            <p>{review.rating}</p>
            <p>{review.review}</p>
          </div>
        ))
      )}
    </div>
  )
}

const mapState = state => ({
  book: state.singleBook
})

const mapDispatch = dispatch => ({
  loadSingleBook: id => dispatch(fetchSingleBook(id)),
  handleAddToCart: (book, quantity) => dispatch(addToCart(book, quantity))
})

export default connect(mapState, mapDispatch)(SingleBook)
