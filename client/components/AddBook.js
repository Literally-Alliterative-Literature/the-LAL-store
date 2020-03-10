import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addBook} from '../store/allbooks'

function AddBook(props) {
  const [bookAdded, setAdded] = useState(false)

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
    props.submitBook(book)
    setAdded(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input type="text" className="input" name="title" />
        </div>
      </div>

      <div className="field">
        <label className="label">Author</label>
        <div className="control">
          <input type="text" className="input" name="author" />
        </div>
      </div>

      <div className="field">
        <label className="label">Image URL</label>
        <div className="control">
          <input type="text" className="input" name="imageUrl" />
        </div>
      </div>

      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input type="number" className="input" name="price" />
        </div>
      </div>

      <div className="field">
        <label className="label">Quantity</label>
        <div className="control">
          <input type="number" className="input" name="quantity" />
        </div>
      </div>

      <div className="field">
        <label className="label">Synopsis</label>
        <div className="control">
          <textarea className="textarea" name="synopsis" />
        </div>
      </div>

      <div className="field">
        <label className="label">Genre</label>
        <div className="control">
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
        {bookAdded ? (
          <>
            <h3>Book Added!</h3>
            <button type="button">
              <a href="/addBook">Add Another Book</a>
            </button>
          </>
        ) : (
          false
        )}
      </div>
    </form>
  )
}

const mapDispatch = dispatch => ({
  submitBook: book => dispatch(addBook(book))
})

export default connect(null, mapDispatch)(AddBook)
