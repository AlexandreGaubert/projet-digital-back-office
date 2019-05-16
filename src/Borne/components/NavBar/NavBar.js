import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

import './NavBar.css'

class NavBar extends React.Component {
  render () {
    const { title, color } = this.props;

    return (
      <div id="NavBar" style={{background: color}}>
        <i className="fas fa-arrow-left" onClick={() => this.props.history.goBack()}/>
        <span>{title}</span>
        <Link to="/borne/home" className="fas fa-home NavBar-home-icon"/>
      </div>
    )
  }
}

export default withRouter(NavBar);
