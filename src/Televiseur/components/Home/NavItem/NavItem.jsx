import React, { Component } from "react"
import {Link} from 'react-router-dom'

import './NavItem.css'

export default class HomeNavItem extends Component {
  static defaultProps = {
    title: "",
    path: '/',
    icon: 'fas fa-cross',
    bgColor: 'red'
  }
  state = {}

  render() {
    const { title, path, icon, bgColor } = this.props;

    return (
      <Link to={path} className="nav-item" style={{backgroundColor: bgColor}}>
        <i style={{fontSize: '5vw', margin: '.2em'}} className={"fas fa-" + icon}/>
        <h1 style={{fontWeight: '200'}}>{title}</h1>
      </Link>
    )
  }
}
