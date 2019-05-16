import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Informations.css'
import NavBar from '../../components/NavBar/NavBar'

class ScreensInformations extends React.Component {
  render () {
    return (
      <div id="ScreensInformations">
        <NavBar
          title="Informations"
          color="#0cce6b"
          />
        <div style={{display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'space-around', padding: '2em'}}>
          <NavButton
            title="une équipe à votre écoute"
            path="une-equipe-a-votre-ecoute"
            color="#ed8ba3"/>
          <NavButton
            title="contrat de séjour"
            path="contrat-de-sejour"
            color="#cb6ce6"/>
          <NavButton
            title="réglement intérieur"
            path="reglement-interieur"
            color="#dced31"/>
          <NavButton
            title="frais de séjour"
            path="frais-de-sejour"
            color="#38b6ff"/>
          <NavButton
            title="vos droits"
            path="vos-droits"
            color="#0cce6b"/>
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
        pathname: '/borne/informations/' + path,
        color: color,
        title: title
      }}
      style={{background: color}}
      className="Informations-NavButton"
    >
      {title.toUpperCase()}
    </Link>
  )
}

export default ScreensInformations;
