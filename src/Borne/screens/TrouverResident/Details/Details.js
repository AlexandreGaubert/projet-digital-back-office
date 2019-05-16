import React from 'react'
import PropTypes from 'prop-types'

import styles from './Details.module.css'
import NavBar from '../../../components/NavBar/NavBar'

class ScreensTrouverResidentDetails extends React.Component {
  render () {
    const resident = this.props.location.state.resident;
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <NavBar
          title="Trouver Un Résident"
          color="#dced31"
          />
        <div className={styles.container}>
          <span className={styles.name}>{resident.gender} {resident.firstname.slice(0, 1).toUpperCase() + resident.firstname.slice(1)} <b>{resident.lastname.toUpperCase()}</b></span>
          <img
            className={styles.photo}
            src={'http://localhost:8080/user.png'}
          />
          <span className={styles.room}>Appartement n°<b>{resident.room}</b></span>
          <span className={styles.location}><b>Batiment A</b> sur votre <b>gauche</b></span>
        </div>

      </div>
    )
  }
}

export default ScreensTrouverResidentDetails;
