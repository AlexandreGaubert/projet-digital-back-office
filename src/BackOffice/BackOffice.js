import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import openSocket from 'socket.io-client';
import axios from 'axios'

import SideBar from './components/SideBar'
import Header from './components/Header'
import LesMenus from './pages/LesMenus/LesMenus'
import LesActivités from './pages/LesActivités/LesActivités'
import LesNews from './pages/LesNews/LesNews'
import LaGallerie from './pages/LaGallerie/LaGallerie'
import LesAvis from './pages/LesAvis/LesAvis'
import LesRésidents from './pages/LesRésidents/LesRésidents'
import LePersonnel from './pages/LePersonnel/LePersonnel'
import Login from './pages/Auth/Login'
import Users from './pages/Users/Users'
import { store } from '../redux/store'
axios.defaults.withCredentials = true;
document.socket = openSocket('http://localhost:8080')

class BackOffice extends Component {
  state = {
    isAuth: false,
    user: {}
  }
  componentDidMount() {
    document.title = "back-office de l'ourme"
  }
  componentWillMount() {
    axios.get('http://localhost:8080/isAuth')
    .then(res => {
      this.setState({isAuth: true, user: res.data.user});
    })
    .catch(err => {

    })
  }
  renderLogin() {
    return (
      <Login/>
    )
  }
  renderBackOffice() {
    console.log(this.state.user);
    return (
      <Router>
      <div style={{display: 'flex'}} className="BackOffice">
        <SideBar/>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#eaedf2'}}>
          <Header user={this.state.user}/>
          {/* TÉLÉVISEUR */}
          <Route path="/back-office/les-menus" component={LesMenus}/>
          <Route path="/back-office/les-activités" component={LesActivités}/>
          <Route path="/back-office/les-news" component={LesNews}/>
          <Route path="/back-office/la-gallerie" component={LaGallerie}/>
          <Route path="/back-office/les-avis" component={LesAvis}/>
          {/* AUTRES */}
          <Route path="/back-office/les-residents" component={LesRésidents}/>
          <Route path="/back-office/le-personnel" component={LePersonnel}/>
          <Route path="/back-office/users" component={Users}/>
        </div>
      </div>
      </Router>
    )
  }
  render() {
    const { isAuth } = this.state

    if (isAuth) return this.renderBackOffice()
    else return this.renderLogin()
  }
}

export default BackOffice;

window.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Octobre', 'Novembre', 'Décembre'];
window.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
