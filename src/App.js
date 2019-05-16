import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import openSocket from 'socket.io-client';

import BackOffice from './BackOffice/BackOffice'
import Televiseur from './Televiseur/Televiseur'
import Borne from './Borne/Borne'
import SandBox from './SandBox'
import { store } from './redux/store'
import './App.css';

document.socket = openSocket('http://localhost:8080')

class App extends Component {
  state = {
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    //remove socket !!!!
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/back-office" component={BackOffice}/>
          <Route path="/televiseur" component={Televiseur}/>
          <Route path="/borne" component={Borne}/>
          <Route path="/sandbox" component={SandBox}/>
        </div>
      </Router>
    )
  }
}

export default App;

window.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Octobre', 'Novembre', 'Décembre'];
window.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
