import React from 'react'
import PropTypes from 'prop-types'

import { APICall } from '../../../../redux/APICall'
import { store } from '../../../../redux/store'
import AvisListItem from './Item/Item'
import './List.css'

class AvisList extends React.Component {
  state = {
    avis: [],
    avisOpened: null
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({avis: store.getState().avis.avis.filter(item => item.solved === false)})
    })
    store.dispatch({type: 'GET_AVIS_OF_RESIDENT', data: {resident: this.props.resident}})
  }
  openAvis(avisOpened) {
    this.setState({avisOpenedID: avisOpened._id});
  }
  closeAvis() {
    this.setState({avisOpenedID: null});
  }
  render () {
    const { avis, avisOpenedID } = this.state;
    var avisOpened = null;
    if (avisOpenedID != null) {
      avisOpened = avis.find(obj => obj._id === avisOpenedID)
    }
    console.log(avis);
    return (
      <div id="AvisList">
        {avisOpened !== null && <AvisListItem closeAvis={this.closeAvis.bind(this)} avis={avisOpened}/>}
        {avisOpened === null && avis.map((item, key) => {
          const date = new Date(item.date)
          return (
            <span onClick={() => this.openAvis.bind(this)(item)} style={{background: item.type === "negative" && "rgb(255, 0, 0, .7)" }} className="AvisList-item">
              {item.newMessageFromFoyer > 0 &&<i className="fas fa-envelope "><p>{item.newMessageFromFoyer}</p></i>}
              <p>
                {`Mon avis ${item.type === "positive" ? "positif" : "négatif"} du ${window.days[date.getDay()]} ${date.getDate()} ${window.months[date.getMonth()]} ${date.getFullYear()}`}
              </p>
            </span>
          )
        })}
      </div>
    )
  }
}

export default AvisList;
