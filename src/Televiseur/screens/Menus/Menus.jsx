import React from 'react'
import PropTypes from 'prop-types'

import Auth from '../../components/reusable/Auth/Auth'
import MenusPicker from "../../components/Menus/Picker/Picker"
import MenusFinish from "../../components/Menus/Finish/Finish"
import ScreenTitle from "../../components/reusable/ScreenTitle"
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
      if (res.code === 404) this.setState({menu: null, isAuth: true, resident});
    })
  }
  render () {
    const { isAuth, resident, menu } = this.state;
    console.log(menu);
    return (
      <div>
        <ScreenTitle title="je choisis mon menu" icon="utensils" bgColor="#f49b49"/>
        {!isAuth && <Auth validateAuth={this.validateAuth.bind(this)}/>}
        {(isAuth && menu != null) && <MenusPicker menu={menu} resident={resident}/>}
        {(isAuth && menu === null) && <MenusFinish text={"Aucun menu n'a été trouvé, merci de réessayer plus tard"}/>}
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
