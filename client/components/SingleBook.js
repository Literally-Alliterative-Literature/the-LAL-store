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

  const turnRatingIntoArr = rating => {
    let ratingArr = []
    for (let i = 0; i < rating; i++) {
      ratingArr.push(i)
    }
    return ratingArr
  }

  let singleBookRating

  if (!props.book.reviews) props.book.reviews = []
  else {
    singleBookRating =
      props.book.reviews.reduce((accum, review) => accum + review.rating, 0) /
      props.book.reviews.length
    Math.round(singleBookRating)
    singleBookRating = turnRatingIntoArr(singleBookRating)
  }

  const getDateString = date => {
    let short = date.slice(0, 10)
    return `${short.slice(5, 7)}/${short.slice(8)}/${short.slice(0, 4)}`
  }

  return (
    <div className="columns has-text-centered">
      <div className="column">
        <h2 className="title">{props.book.title}</h2>
        <h3 className="subtitle">{props.book.author}</h3>
        <img src={props.book.imageUrl} />
        <p>{props.book.genre}</p>
        <p>{props.book.synopsis}</p>
        <p>
          Rating:
          {props.book.reviews.length ? (
            singleBookRating.map(elem => (
              <span className="icon" key={elem}>
                <i className="fas fa-star has-text-warning" />
              </span>
            ))
          ) : (
            <span>No Ratings</span>
          )}
        </p>
        <div className="box has-background-link">
          <h3 className="subtitle">Reviews</h3>
          {!props.book.reviews.length ? (
            <p>No Reviews</p>
          ) : (
            props.book.reviews.map(review => {
              return (
                <div key={review.id} className="review">
                  <span>
                    {review.user.name} {getDateString(review.createdAt)}
                    {'   '}
                    {turnRatingIntoArr(review.rating).map(elem => (
                      <span className="icon" key={elem}>
                        <i className="fas fa-star has-text-warning" />
                      </span>
                    ))}
                  </span>
                  <p>{review.review}</p>
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className="column is-one-third">
        <p>${props.book.price}</p>
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
      </div>
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
