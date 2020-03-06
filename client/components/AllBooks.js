import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../store/allbooks'
import {Link} from 'react-router-dom'

function AllBooks(props) {
  if (!props.books) props.books = []
  useEffect(() => {
    props.loadBooks()
  }, [])
  return (
    <div className="columns is-primary is-multiline">
      {props.books.length
        ? props.books.map(book => {
            return (
              <div
                className="column is-one-third has-text-centered"
                // className="allBooks box has-text-centered has-background-primary is-light"
                key={book.id}
              >
                <Link to={`/books/${book.id}`}>
                  <img src={book.imageUrl} />
                  <h3>{book.title}</h3>
                  <p>${book.price}</p>
                </Link>
              </div>
            )
          })
        : false}
    </div>
  )
}

const mapState = state => ({
  books: state.allbooks
})

const mapDispatch = dispatch => ({
  loadBooks: () => dispatch(fetchBooks())
})

export default connect(mapState, mapDispatch)(AllBooks)
