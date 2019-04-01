import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import openSocket from 'socket.io-client';

import { store } from '../redux/store'
import ScreensHome from './screens/Home/Home.js'
import ScreensGallery from './screens/Gallery/Gallery'
import ScreensActivités from './screens/Activités/Activités.jsx'
import ScreensMenus from './screens/Menus/Menus.jsx'
import NavigationBar from './components/NavigationBar/NavigationBar'

document.socket = openSocket('http://localhost:8080')

class Televiseur extends Component {
  state = {
  }
  componentDidMount() {
    document.title = "Téléviseur de l'Ourme"
  }
  render() {
    return (
      <Router>
        <div className="Televiseur">
          <Route exact path="/televiseur/home" component={ScreensHome}/>
          <Route exact path="/televiseur/les-activités" component={ScreensActivités}/>
          <Route exact path="/televiseur/la-gallerie" component={ScreensGallery}/>
          <Route exact path="/televiseur/les-menus" component={ScreensMenus}/>
        </div>
      </Router>
    )
  }
}

export default Televiseur;

// window.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Octobre', 'Novembre', 'Décembre'];
// window.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
