import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchBooksTable, deleteBook} from '../store/allbooks'

function AllBooksTable(props) {
  if (!props.books) props.books = []
  useEffect(() => {
    props.loadBooks()
  }, [])

  const handleDelete = id => {
    props.deleteBook(id)
  }

  return (
    <div className="is-marginless">
      <h2 className="title">All Books</h2>
      <button type="button" className="button is-primary">
        <Link to="/addBook">Add Book</Link>
      </button>
      <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {props.books.length ? (
              props.books.map(book => {
                return (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.price}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <button type="button">
                        <Link to={`/editBook/${book.id}`}>Edit</Link>
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(book.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapState = state => ({
  books: state.allbooks
})
const mapDispatch = dispatch => ({
  loadBooks: () => dispatch(fetchBooksTable()),
  deleteBook: id => dispatch(deleteBook(id))
})

export default connect(mapState, mapDispatch)(AllBooksTable)
