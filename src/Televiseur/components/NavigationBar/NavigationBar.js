import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './NavigationBar.css'

class NavigationBar extends React.Component {
  render () {
    return (
      <div id="NavigationBar">
        <NavItem to="les-activités" icon="calendar" bgColor="#51e5ff" title="Les Activités"/>
        <NavItem to="la-gallerie" icon="camera-retro" bgColor="#9975ba" title="La Galerie"/>
        <NavItem to="les-nouvelles" icon="newspaper" bgColor="#ec368d" title="Les Nouvelles"/>
        <NavItem to="les-menus" icon="utensils" bgColor="#f49b49" title="Les Menus"/>
        <NavItem to="les-avis" icon="pencil-alt" bgColor="#ffa5a5" title="Les Avis"/>
      </div>
    )
  }
}

const NavItem = props => {
  return (
    <Link to={'/televiseur/' + props.to} style={{background: props.bgColor}} className="NavigationBar-link">
      <i className={"fas fa-" + props.icon}/>
      {props.title}
    </Link>
  )
}

export default NavigationBar;
