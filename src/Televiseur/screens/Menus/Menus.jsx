import React from 'react'
import PropTypes from 'prop-types'

import MenusAuth from "../../components/Menus/Auth/Auth"
import MenusPicker from "../../components/Menus/Picker/Picker"
import { APICall } from '../../../redux/APICall'
class ScreensMenu extends React.Component {
  state = {
    isAuth: false,
    resident: {},
    menu: {}
  }
  validateAuth(resident) {
    APICall("GET_MENU_OF_WEEK", document.socket, {monday: getCurrentWeekMonday(new Date()).toISOString().slice(0, 10)})
    .then(res => {
      this.setState({menu: res.menu, isAuth: true, resident});
    })
    .catch(res => {

    })
  }
  render () {
    const { isAuth, resident, menu } = this.state;
    return (
      <div>
        {!isAuth && <MenusAuth validateAuth={this.validateAuth.bind(this)}/>}
        {isAuth && <MenusPicker menu={menu} resident={resident}/>}
      </div>
    )
  }
}

function getCurrentWeekMonday(date) {
  if (date.getDay === 1) return date;

  var monday = new Date();
  //decreasing date until monday
  for (var i = date.getDay(); i > 1; i--) {
    monday.setDate(monday.getDate() -1)
  }
  return monday;
}

export default ScreensMenu;
