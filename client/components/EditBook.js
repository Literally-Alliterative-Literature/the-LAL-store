import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editBook} from '../store/allbooks'
import {fetchSingleBook} from '../store/singleBook'

function EditBook(props) {
  const [bookEdited, setEdited] = useState(false)

  useEffect(() => {
    props.loadSingleBook(props.match.params.id)
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const book = {
      title: event.target.title.value,
      author: event.target.author.value,
      imageUrl: event.target.imageUrl.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
      synopsis: event.target.synopsis.value,
      genre: event.target.genre.value
    }
    props.editBook(props.match.params.id, book)
    setEdited(true)
    props.loadSingleBook(props.match.params.id)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <label className="label">Title</label>
          <p className="help">Old Title: {props.book.title}</p>
          <input type="text" className="input" name="title" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">Author</label>
          <p className="help">Old Author: {props.book.author}</p>
          <input type="text" className="input" name="author" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">Image URL</label>
          <p className="help">Old Image URL: {props.book.imageUrl}</p>
          <input type="text" className="input" name="imageUrl" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">Price</label>
          <p className="help">Old Price: ${props.book.price}</p>
          <input type="number" className="input" name="price" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">Quantity</label>
          <p className="help">Old Quantity: {props.book.quantity}</p>
          <input type="number" className="input" name="quantity" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">Synopsis</label>
          <p className="help">Old Synopsis: {props.book.synopsis}</p>
          <textarea className="textarea" name="synopsis" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">Genre</label>
          <select className="select" name="genre">
            <option>Steamy Romance</option>
          </select>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Submit
          </button>
        </div>
        {bookEdited ? (
          <>
            <h3>Book Edited!</h3>
            <button className="button is-primary" type="button">
              <Link to="/booksTable">Edit Another Book</Link>
            </button>
          </>
        ) : (
          false
        )}
      </div>
    </form>
  )
}

const mapState = state => ({
  book: state.singleBook
})

const mapDispatch = dispatch => ({
  editBook: (id, book) => dispatch(editBook(id, book)),
  loadSingleBook: id => dispatch(fetchSingleBook(id))
})

export default connect(mapState, mapDispatch)(EditBook)
