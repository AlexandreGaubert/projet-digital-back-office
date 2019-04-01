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
import LesRésidents from './pages/LesRésidents/LesRésidents'
import Login from './pages/Auth/Login'
import { store } from '../redux/store'

document.socket = openSocket('http://localhost:8080')

class BackOffice extends Component {
  state = {
    isAuth: store.getState().users.isAuth
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({isAuth: store.getState().users.isAuth}))
    store.dispatch({type: 'USER_IS_AUTH', data: null})
    document.title = "back-office de l'ourme"
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  renderLogin() {
    return (
      <Login/>
    )
  }
  renderBackOffice() {
    return (
      <Router>
      <div style={{display: 'flex'}} className="BackOffice">
        <SideBar/>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#eaedf2'}}>
          <Header/>
          {/* TÉLÉVISEUR */}
          <Route path="/back-office/les-menus" component={LesMenus}/>
          <Route path="/back-office/les-activités" component={LesActivités}/>
          <Route path="/back-office/les-news" component={LesNews}/>
          <Route path="/back-office/la-gallerie" component={LaGallerie}/>
          <Route path="/back-office/les-avis" component={LesAvis}/>
          {/* AUTRES */}
          <Route path="/back-office/les-residents" component={LesRésidents}/>
        </div>
      </div>
      </Router>
    )
  }
  render() {
    return this.renderBackOffice()
  }
}

export default BackOffice;

window.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Octobre', 'Novembre', 'Décembre'];
window.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
