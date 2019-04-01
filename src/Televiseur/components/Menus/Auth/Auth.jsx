import React from 'react'
import PropTypes from 'prop-types'

import './Auth.css'
import Button from '../../../../BackOffice/components/reusable/Button'
import {APICall} from '../../../../redux/APICall'

class MenusAuth extends React.Component {
  state = {
    code: '',
    authError: null
  }
  handleCodeChange(e) {
    this.setState({code: e.target.value});
  }
  submit() {
    APICall('AUTH_RESIDENT', document.socket, {code: this.state.code})
    .then(res => {
      this.props.validateAuth(res.resident)
    })
    .catch(res => {
      if (res.code === 404)
        this.setState({authError: 'Aucun résident ne correspond à ce numéro de chambre'});
      else if (res.code === 500)
        this.setState({authError: "Il y a eu un problème interne à l'application"});
    })
  }
  render () {
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
          {authError !== null && <p className="error">{authError}</p>}
          <Button action={this.submit.bind(this)} text="VALIDER" style={{width: "100%"}} type="submit"/>
        </div>
      </div>
    )
  }
}

export default MenusAuth;
