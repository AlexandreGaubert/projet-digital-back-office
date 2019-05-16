import React from 'react'
import PropTypes from 'prop-types'

import './ScreenTitle.css'

class ScreenTitle extends React.Component {
  render () {
    const { title, icon, bgColor } = this.props;
    return (
      <h1 id="ScreenTitle" style={{background: bgColor}}>
        <i className={"fas fa-" + icon}/>
        {title.toUpperCase()}
      </h1>
    )
  }
}

export default ScreenTitle;
