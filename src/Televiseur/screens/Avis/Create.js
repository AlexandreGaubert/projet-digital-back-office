import React from 'react'
import PropTypes from 'prop-types'

import Auth from '../../components/reusable/Auth/Auth'
import ScreenTitle from '../../components/reusable/ScreenTitle'
import AvisCreate from '../../components/Avis/Create/Create'
import './Create.css'

class ScreensAvisCreate extends React.Component {
  state = {
    resident: null,
    isAuth: false,
  }
  validateAuth(resident) {
    this.setState({resident, isAuth: true});
  }
  render () {
    const { isAuth, resident } = this.state;

    return (
      <div id="ScreensAvisCreate">
        <ScreenTitle title="je donne mon avis" bgColor="#ffa5a5" icon="pencil-alt"/>
        {!isAuth && <Auth validateAuth={this.validateAuth.bind(this)}/>}
        {isAuth && resident != null && <AvisCreate resident={resident}/>}
      </div>
    )
  }
}

export default ScreensAvisCreate;
