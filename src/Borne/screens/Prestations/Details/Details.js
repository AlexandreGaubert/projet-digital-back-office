import React from 'react'
import PropTypes from 'prop-types'

import './Details.css'
import NavBar from '../../../components/NavBar/NavBar'
import HébergementTemporaire from '../../../components/Prestations/Details/HébergementTemporaire'

const prestations = [
  {
    path: '/borne/nos-prestations/hebergement-temporaire',
    component: null,
    image: 'hebergement-temporaire.png'
  },
  {
    path: '/borne/nos-prestations/hebergement-permanent',
    component: null,
    image: 'hebergement-permanent.png'
  },
  {
    path: '/borne/nos-prestations/mardis-de-l-ourme',
    component: null,
    image: 'mardis-de-l-ourme.png'
  },
]

class ScreensPrestationsDetails extends React.Component {
  render () {
    const { color, title } = this.props.location;
    const prestation = prestations.find(prst => prst.path === this.props.location.pathname);
    const Component = prestation.component;
    const image = prestation.image;

    return (
      <div id="ScreensPrestationsDetails">
        <NavBar title={title} color={color}/>
        {Component != null && <Component/>}
        {image != null && <img src={require('./' + image)}/>}
      </div>
    )
  }
}

export default ScreensPrestationsDetails;
