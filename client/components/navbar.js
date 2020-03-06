import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import Payment from './payment'
const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar is-fixed-top is-info">
      {isLoggedIn ? (
        <>
          <div className="navbar-brand">
            <span className="navbar-item ">The LAL Store</span>
          </div>
          <div className="navbar-menu">
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="navbar-item">
              Home
            </Link>
           <Link to="/user" className="navbar-item">User</Link>
            <Link to="/cart" className="navbar-item">
              Cart
            </Link>
            <Link to="/books" className="navbar-item">
              Browse
            </Link>
          </div>
          <div className="navbar-end">
            <a href="#" className="navbar-item" onClick={handleClick}>
              Logout
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-brand">
            <span className="navbar-item">The LAL Store</span>
          </div>
          <div className="navbar-menu">
            {/* The navbar will show these links before you log in */}
            <Link to="/cart" className="navbar-item">
              Cart
            </Link>
            <Link to="/books" className="navbar-item">
              Browse
            </Link>
            {/* <Payment/> */}
          </div>
          <div className="navbar-end">
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/signup" className="navbar-item">
              Sign Up
            </Link>
          </div>
        </>
      )}
      <hr className="navbar-divider" />
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
