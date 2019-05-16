import React from 'react'
import PropTypes from 'prop-types'

import './Auth.css'
import Button from '../../../../BackOffice/components/reusable/Button'
import {APICall} from '../../../../redux/APICall'

class AvisAuth extends React.Component {
  state = {
    code: '',
    authError: null,
    resident: null
  }
  handleCodeChange(e) {
    this.setState({code: e.target.value});
  }
  submit() {
    APICall('AUTH_RESIDENT', document.socket, {code: this.state.code})
    .then(res => {
      this.setState({resident: res.resident});
    })
    .catch(res => {
      if (res.code === 404) {
        this.setState({authError: 'Aucun résident ne correspond à ce numéro de chambre'});
        setTimeout(() => this.setState({authError: null}), 5000)
      }
      else if (res.code === 500) {
        this.setState({authError: "Il y a eu un problème interne à l'application"});
        setTimeout(() => this.setState({authError: null}), 5000)
      }
    })
  }
  renderConfirm() {
    const { resident } = this.state;

    return (
      <div className="AuthConfirm">
        <h1 style={{marginBottom: '1em'}}>Est-ce bien vous ?</h1>
        <img src={require('./user.png')} style={{height: '30vh'}}/>
        <h1>{`${resident.firstname} ${resident.lastname.toUpperCase()}`}</h1>
        <h2>{`Chambre n°${resident.room}`}</h2>
        <div className="AuthConfirm-buttonGroup">
          <span onClick={() => this.props.validateAuth(resident)} className="AuthConfirm-button">OUI</span>
          <span onClick={() => this.setState({resident: null})} className="AuthConfirm-button">NON</span>
        </div>
      </div>
    )
  }
  renderInput() {
    const { code, authError } = this.state;

    return (
      <div className="container">
        <div className="input-group">
          <p>Veuillez entrer votre numéro de chambre</p>
          <input
            placeholder="Numéro..."
            className="input"
            value={code}
            onChange={this.handleCodeChange.bind(this)}
          />
          <p style={{opacity: authError !== null ? 1 : 0}} className="error">{authError}</p>
          <Button action={this.submit.bind(this)} text="VALIDER" style={{width: "100%"}} type="submit"/>
        </div>
      </div>
    )
  }
  render () {
    const { resident } = this.state;
    if (resident === null) return(this.renderInput())
    else if (resident !== null) return (this.renderConfirm())
    else return (<div>Internal Error, sorry</div>)
  }
}

export default AvisAuth;
