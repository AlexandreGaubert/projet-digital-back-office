import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './Finish.css'

class MenusFinish extends React.Component {
  render () {
    return (
      <div className="Finish-container">
        <h1>{this.props.text}</h1>
        <Button text="RETOURNER A L'ACCUEIL" icon="fas fa-home" bgColor="#7ed957"/>
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <Link to="/televiseur/home" style={{backgroundColor: props.bgColor}} onClick={props.action} className="Finish-button">
      <i className={"Finish-button-icon" + " " + props.icon }/>
      <p className="Finish-button-text">{props.text}</p>
    </Link>
  )
}

export default MenusFinish;
