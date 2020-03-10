import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchSingleBook, addReview} from '../store/singleBook'
import {addToCart} from '../store/shoppingcart'

function SingleBook(props) {
  const [toCart, setToCart] = useState(false)
  const handleClick = event => {
    event.preventDefault()
    setToCart(true)
    if (!event.target.quantity.value) event.target.quantity.value = 1
    props.handleAddToCart(props.book, event.target.quantity.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.handleAddReview(
      props.book.id,
      event.target.review.value,
      event.target.rating.value
    )
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
      <div className="column" />
      <div className="card column is-half">
        <div className="columns">
          <div className="column is-half">
            <h2 className="title" id="title1">
              {props.book.title}
            </h2>
            <h3 className="subtitle" id="title2">
              by: {props.book.author}
            </h3>
            <img src={props.book.imageUrl} />
          </div>
          <div className="column is-half" id="content-column">
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
            <p>${props.book.price}</p>
            <form onSubmit={handleClick}>
              <label htmlFor="quantity">Number of copies (optional):</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                min="0"
                max="1000"
              />
              <br />
              <button className="button is-success is-outlined" type="submit">
                Add To Cart
              </button>
            </form>
            {toCart ? <p>Item added to cart</p> : false}
          </div>
        </div>
        <div className="box">
          <h3 className="subtitle">Reviews</h3>
          {!props.book.reviews.length ? (
            <p>No Reviews</p>
          ) : (
            props.book.reviews.map(review => {
              return (
                <div key={review.id} className="review">
                  <span>
                    <div className="bold">{review.user.name}</div>{' '}
                    {getDateString(review.createdAt)}
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
        {props.user.id ? (
          <div>
            <h4>Add A Review:</h4>
            <form onSubmit={handleSubmit}>
              <label>Review:</label>
              <textarea
                className="form-control textarea is-success"
                name="review"
                required="required"
              />
              <label>
                Rating: 1
                <input type="radio" name="rating" value="1" />
                <input type="radio" name="rating" value="2" />
                <input type="radio" name="rating" value="3" />
                <input type="radio" name="rating" value="4" />
                <input type="radio" name="rating" value="5" />5
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <p>You need to be logged in to add a review!</p>
        )}
      </div>
      <div className="column" />
    </div>
  )
}

const mapState = state => ({
  book: state.singleBook,
  user: state.user
})

const mapDispatch = dispatch => ({
  loadSingleBook: id => dispatch(fetchSingleBook(id)),
  handleAddToCart: (book, quantity) => dispatch(addToCart(book, quantity)),
  handleAddReview: (id, review, rating) =>
    dispatch(addReview(id, review, rating))
})

export default connect(mapState, mapDispatch)(SingleBook)
