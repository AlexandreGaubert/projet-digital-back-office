import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import openSocket from 'socket.io-client';

import { store } from '../redux/store'
import ScreensHome from './screens/Home/Home.js'
import ScreensGallery from './screens/Gallery/Gallery'
import ScreensActivités from './screens/Activités/Activités.jsx'
import ScreensMenus from './screens/Menus/Menus.jsx'
import ScreensNews from './screens/News/News.js'
import ScreensAvis from './screens/Avis/Avis.js'
import ScreensAvisCreate from './screens/Avis/Create.js'
import ScreensAvisList from './screens/Avis/List.js'
import NavigationBar from './components/NavigationBar/NavigationBar'

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
          <NavigationBar/>
          <Route exact path="/televiseur/home" component={ScreensHome}/>
          <Route exact path="/televiseur/les-activités" component={ScreensActivités}/>
          <Route exact path="/televiseur/la-gallerie" component={ScreensGallery}/>
          <Route exact path="/televiseur/les-nouvelles" component={ScreensNews}/>
          <Route exact path="/televiseur/les-menus" component={ScreensMenus}/>
          <Route exact path="/televiseur/les-avis" component={ScreensAvis}/>
          <Route exact path="/televiseur/les-avis/create" component={ScreensAvisCreate}/>
          <Route exact path="/televiseur/les-avis/list" component={ScreensAvisList}/>
        </div>
      </Router>
    )
  }
}

export default Televiseur;

// window.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Octobre', 'Novembre', 'Décembre'];
// window.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
