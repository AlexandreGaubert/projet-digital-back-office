import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import openSocket from 'socket.io-client';

import SideBar from './components/SideBar'
import Header from './components/Header'
import LesMenus from './pages/LesMenus/LesMenus'
import LesActivités from './pages/LesActivités/LesActivités'
import LesNews from './pages/LesNews/LesNews'
import LaGallerie from './pages/LaGallerie/LaGallerie'
import LesAvis from './pages/LesAvis/LesAvis'
import './App.css';

document.socket = openSocket('http://localhost:8080')

class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <Router>
        <div style={{display: 'flex'}} className="App">
          <SideBar/>
          <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#eaedf2'}}>
            <Header/>
            <Route path="/les-menus" component={LesMenus}/>
            <Route path="/les-activités" component={LesActivités}/>
            <Route path="/les-news" component={LesNews}/>
            <Route path="/la-gallerie" component={LaGallerie}/>
            <Route path="/les-avis" component={LesAvis}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

window.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Octobre', 'Novembre', 'Décembre'];
window.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
