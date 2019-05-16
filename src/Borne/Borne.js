import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { store } from '../redux/store'
import ScreensHome from './screens/Home/Home'
import ScreensPrestations from './screens/Prestations/Prestations'
import ScreensInformations from './screens/Informations/Informations'
import ScreensInformationsEmployees from './screens/Informations/Employees/Employees'
import ScreensTrouverResident from './screens/TrouverResident/TrouverResident'
import ScreensTrouverResidentDetails from './screens/TrouverResident/Details/Details'
import ScreensPrestationsDetails from './screens/Prestations/Details/Details'

class Televiseur extends Component {
  state = {}

  componentDidMount() {
    document.title = "Téléviseur de l'Ourme"
  }
  render() {
    return (
      <Router>
        <div className="Borne" style={{width: '100vw', height: '100vh', margin: 'auto', background: "#fefbf9"}}>
          <Route exact path="/borne/home" component={ScreensHome}/>
          <Route exact path="/borne/nos-prestations" component={ScreensPrestations}/>
          <Route exact path="/borne/informations" component={ScreensInformations}/>
          <Route exact path="/borne/informations/une-equipe-a-votre-ecoute" component={ScreensInformationsEmployees}/>
          <Route exact path="/borne/trouver-un-resident" component={ScreensTrouverResident}/>
          <Route exact path="/borne/trouver-un-resident/details" component={ScreensTrouverResidentDetails}/>
          <Route path="/borne/nos-prestations/:prestation" component={ScreensPrestationsDetails}/>
        </div>
      </Router>
    )
  }
}

export default Televiseur;
