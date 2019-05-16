import React from 'react'
import PropTypes from 'prop-types'

import './Prestations.css'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from 'react-router-dom'

class ScreensPrestations extends React.Component {
  render () {
    return (
      <div id="ScreensPrestations">
        <NavBar
          title="Nos Prestations"
          color="#ed8ba3"
          />
        <div style={{display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'space-around', padding: '2em'}}>
          <NavButton
            title="hébergement temporaire"
            path="hebergement-temporaire"
            color="#8c52ff"/>
          <NavButton
            title="hébergement permanent"
            path="hebergement-permanent"
            color="#0cce6b"/>
          <NavButton
            title="tables ouvertes"
            path="tables-ouvertes"
            color="#ed8ba3"/>
          <NavButton
            title="mardis de l'ourme"
            path="mardis-de-l-ourme"
            color="#cb6ce6"/>
          <NavButton
            title="ateliers de prévention à la perte d'autonomie"
            path="ateliers-de-prevention-a-la-perte-d'autonomie"
            color="#ffbd59"/>
          <NavButton
            title="mouvance"
            path="mouvance"
            color="#38b6ff"/>
        </div>


      </div>
    )
  }
}

const NavButton = props => {
  const { title, path, color } = props;

  return (
    <Link
      to={{
        pathname: '/borne/nos-prestations/' + path,
        color: color,
        title: title
      }}
      style={{background: color}}
      className="Prestations-NavButton"
    >
      {title.toUpperCase()}
    </Link>
  )
}

export default ScreensPrestations;
