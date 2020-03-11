import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="tile centerMeSignup">
            <form onSubmit={handleSubmit} name={name}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input required name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input required name="password" type="password" />
              </div>
              {displayName === 'Sign Up' ? (
                <div>
                  <small>Name</small>
                  <label htmlFor="userName">
                    <input required name="userName" type="text" />
                  </label>
                </div>
              ) : (
                false
              )}
              {displayName === 'Sign Up' ? (
                <div>
                  <small>Address</small>
                  <label htmlFor="address">
                    <input required name="address" type="text" />
                  </label>
                </div>
              ) : (
                false
              )}

              <div>
                <button type="submit">{displayName}</button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}

              <a href="/auth/google">{displayName} with Google</a>
            </form>
          </div>
          <img
            src="/images/marilyn2.png"
            alt="welcome2"
            className="welcomeImg"
          />
        </div>
        <div className="column">
          {' '}
          <img
            src="/images/marilyn1.png"
            className="welcomeImg"
            alt="welcome"
          />
          <button type="button" className="button pushDown">
            I need some books!
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let userName = false
      let address = false
      if (formName === 'signup') {
        userName = evt.target.userName.value
        address = evt.target.address.value
      }
      dispatch(auth(email, password, userName, address, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
