import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../store/allbooks'
import {Link} from 'react-router-dom'

const paginationLimit = [12, 20]
function AllBooks(props) {
  let number = props.pageNumber || 100
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [search, setSearch] = useState('')
  if (!props.books) props.books = []
  useEffect(
    () => {
      props.loadBooks(page, limit, search)
    },
    [limit, page, search]
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
                <div className="card animated marginTop">
                  <Link to={`/books/${book.id}`} className="allBookSingle">
                    <h3 className="titleAllBooks">{book.title}</h3>
                    <img src={book.imageUrl} className="animated bounceInUp" />
                    <p className="subtitleAllBooks">${book.price}</p>
                  </Link>
                </div>
              </div>
            )
          })
        : false}
      <div>
        <div className="menu" id="search-bar">
          <form>
            <input
              name="search"
              onChange={evt => setSearch(evt.target.value)}
              value={search}
              placeholder="Search"
            />
          </form>
        </div>
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
    </div>
  )
}

const mapState = state => ({
  books: state.allbooks,
  pageNumber: state.totalpages
})

const mapDispatch = dispatch => ({
  loadBooks: (page, limit, search) => dispatch(fetchBooks(page, limit, search))
})

export default connect(mapState, mapDispatch)(AllBooks)
