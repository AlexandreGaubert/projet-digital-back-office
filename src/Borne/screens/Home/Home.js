import React from 'react'
import PropTypes from 'prop-types'

import './Home.css'
import NavButton from '../../components/NavButton/NavButton'

class ScreensHome extends React.Component {
  render () {
    return (
      <div className="ScreensHome">
        <span className="ScreensHome-title">BIENVENUE</span>
        <NavButton
          title="nos prestations"
          path="nos-prestations"
          icon="users"
          color="#ed8ba3"
          left/>
        <NavButton
          title="informations"
          path="informations"
          icon="info"
          color="#0cce6b"
          right/>
        <NavButton title="trouver un résident"
          path="trouver-un-resident"
          icon="search"
          color="#dced31"
          left/>
        <div className="NavButton" style={{background: '#5ce1e6', justifyContent: 'center'}}>
          <img width="80%" src={"http://localhost:8080/famileo.png"}/>
        </div>
      </div>
    )
  }
}

export default ScreensHome;
