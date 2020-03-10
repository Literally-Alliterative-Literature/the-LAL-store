import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../store/allbooks'
import {Link} from 'react-router-dom'

const paginationLimit = [12, 20]
function AllBooks(props) {
  let number = props.pageNumber || 100
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  if (!props.books) props.books = []
  useEffect(
    () => {
      props.loadBooks(page, limit)
    },
    [limit, page]
  )
  return (
    <div className="columns is-multiline is-centered">
      {props.books.length
        ? props.books.map(book => {
            return (
              <div
                className="column is-one-quarter has-text-centered "
                key={book.id}
              >
                <div className="card">
                  <Link to={`/books/${book.id}`} className="allBookSingle">
                    <img src={book.imageUrl} />
                    <h3>{book.title}</h3>
                    <p>${book.price}</p>
                  </Link>
                </div>
              </div>
            )
          })
        : false}
      <div>
        {paginationLimit.map(limited => (
          <button
            key={limited}
            type="button"
            onClick={() => {
              setLimit(limited)
              setPage(1)
            }}
          >
            {limited}
          </button>
        ))}
        <button type="button" onClick={() => setPage(1)}>
          First Page
        </button>
        {page > 1 ? (
          <button type="button" onClick={() => setPage(page - 1)}>
            Previous Page
          </button>
        ) : (
          false
        )}
        {page < number ? (
          <button type="button" onClick={() => setPage(page + 1)}>
            Next Page
          </button>
        ) : (
          false
        )}
        {page !== number ? (
          <button type="button" onClick={() => setPage(props.pageNumber)}>
            Last Page
          </button>
        ) : (
          false
        )}
      </div>
    </div>
  )
}

const mapState = state => ({
  books: state.allbooks,
  pageNumber: state.totalpages
})

const mapDispatch = dispatch => ({
  loadBooks: (page, limit) => dispatch(fetchBooks(page, limit))
})

export default connect(mapState, mapDispatch)(AllBooks)
