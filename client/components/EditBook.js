import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editBook} from '../store/allbooks'

function EditBook(props) {
  const [bookEdited, setEdited] = useState(false)

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
        {bookEdited ? (
          <>
            <h3>Book Edited!</h3>
            <button type="button">
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

const mapDispatch = dispatch => ({
  editBook: (id, book) => dispatch(editBook(id, book))
})

export default connect(null, mapDispatch)(EditBook)
