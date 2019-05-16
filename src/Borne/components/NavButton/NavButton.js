import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './NavButton.css'

class NavButton extends React.Component {
  render () {
    const { title, icon, color, left, right, path } = this.props;

    return (
      <Link to={path} className="NavButton" style={{background: color, justifyContent: right ? "flex-end" : 'flex-start'}}>
        {left && <Icon icon={icon} left right/>}
        <span style={{textAlign: right ? 'right' : 'left'}} className="NavButton-title">{title.toUpperCase()}</span>
        {right && <Icon icon={icon} left right/>}
      </Link>
    )
  }
}

const Icon = props => {
  return (
    <i
      className={"fas fa-" + props.icon + " NavButton-icon"}
      style={{float: props.right ? 'right' : 'left'}}
      />
  )
}

export default NavButton;
