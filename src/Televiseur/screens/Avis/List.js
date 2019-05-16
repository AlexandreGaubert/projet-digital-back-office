import React from 'react'
import PropTypes from 'prop-types'

import Auth from '../../components/reusable/Auth/Auth'
import ScreenTitle from '../../components/reusable/ScreenTitle'
import AvisList from '../../components/Avis/List/List'
import './List.css'

class ScreensAvisList extends React.Component {
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
      <div id="ScreensAvisList">
        <ScreenTitle title="je donne mon avis" bgColor="#ffa5a5" icon="pencil-alt"/>
        {!isAuth && <Auth validateAuth={this.validateAuth.bind(this)}/>}
        {isAuth && resident != null && <AvisList resident={resident}/>}
      </div>
    )
  }
}

export default ScreensAvisList;
