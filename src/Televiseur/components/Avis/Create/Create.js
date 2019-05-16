import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Create.css'
import { store } from '../../../../redux/store'
class AvisCreate extends React.Component {
  state = {
    type: "positive",
    message: "",
    isOver: false
  }
  submit() {
    if (this.state.message.length > 0) {
      store.dispatch({type: "CREATE_AVIS", data: {
        resident: this.props.resident,
        type: this.state.type,
        messages: [{from: "resident", content: this.state.message}],
        solved: false,
        date: new Date().toISOString().slice(0, 10),
        newMessageFromFoyer: 0,
        newMessageFromResident: 0
      }})
    }

    this.setState(prevstate => {return {
      message: "",
      type: "negative",
      isOver: prevstate.type === "negative" && true
    }});
  }
  render () {
    const { message, type, isOver } = this.state;
    return (
      <div id="AvisCreate">
        {type === "positive" ? <h1>Je note ce qui m'a plu</h1> : <h1>Je note ce qui m'a déplu</h1>}
        <textarea
          placeholder="Écrivez votre avis ici..."
          onChange={(e) => this.setState({message: e.target.value})}
          value={message}
          />
        <span onClick={this.submit.bind(this)} className="AvisCreate-button"><i className="fas fa-check"/>JE VALIDE</span>
        {isOver &&
          <div className="AvisCreate-finish">
            <h1 className="AvisCreate-overMessage">Merci beaucoup pour votre avis, cela compte pour nous.<br/><br/> Vous recevrez une réponse dans les plus brefs délais</h1>
            <Link to="/televiseur/home" className="AvisCreate-button"><i className="fas fa-home"/>RETOURNER A L'ACCUEIL</Link>
          </div>
        }
      </div>
    )
  }
}

export default AvisCreate;
