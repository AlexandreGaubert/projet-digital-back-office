import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Avis.css'
import ScreenTitle from '../../components/reusable/ScreenTitle'
import AvisChooseType from '../../components/Avis/ChooseType/ChooseType'

class ScreensAvis extends React.Component {
  render () {
    return (
      <div id="ScreensAvis">
        <ScreenTitle title="je donne mon avis" bgColor="#ffa5a5" icon="pencil-alt"/>
        <h2>Quelque chose vous a plu ou vous a déplu ?</h2>
        <h2>Donnez votre avis ici et recevez une réponse dans les meilleurs délais</h2>
        <ChooseAction/>
      </div>
    )
  }
}

const ChooseAction = props => {
  return (
    <div id="ChooseAction">
      <Link className="ChooseAction-button" to="/televiseur/les-avis/create"><i className="fas fa-pencil-alt"/>JE DONNE MON AVIS</Link>
      <Link className="ChooseAction-button" to="/televiseur/les-avis/list"><i className="fas fa-list-ul"/>JE CONSULTE MES AVIS</Link>
    </div>
  )
}

export default ScreensAvis;
