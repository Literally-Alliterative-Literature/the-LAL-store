import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="tile centerMe">
            <h3>Welcome to Literally Alliterative Literature!</h3>
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
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
