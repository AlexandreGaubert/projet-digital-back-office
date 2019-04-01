import React, { Component } from "react"

import HomeNavItem from '../../components/Home/NavItem/NavItem'

export default class ScreensHome extends Component {
  static defaultProps = {}
  state = {}
  componentDidMount() {
    document.getElementById('NavigationBar').style.display = 'none'
  }
  componentWillUnmount() {
    document.getElementById('NavigationBar').style.display = 'block'
  }
  render() {
    return(
      <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", backgroundColor: "#fbfef9"}}>
        <HomeNavItem title={"LES\r\nACTIVITÉS"} path="/televiseur/les-activités" icon="calendar" bgColor="#51e5ff"/>
        <HomeNavItem title={"LA\r\nGALERIE"} path="/televiseur/la-gallerie" icon="camera-retro" bgColor="#9975ba"/>
        <HomeNavItem title={"LES\r\nNOUVELLES"} path="/" icon="info" bgColor="#ec368d"/>
        <HomeNavItem title={"JE DONNE\r\nMON AVIS"} path="/" icon="pencil-alt" bgColor="#ffa5a5"/>
        <HomeNavItem title={"JE CHOISIS\r\nMON MENU"} path="/televiseur/les-menus" icon="utensils" bgColor="#f49b49"/>
      </div>
    )
  }
}
