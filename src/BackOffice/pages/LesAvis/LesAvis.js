import React, { Component } from "react"

import List from './List'
import AvisOpen from './AvisOpen'
import {store} from '../../../redux/store'

export default class LesAvis extends Component {
  static defaultProps = {

  }
  state = {
    avis: [],
    avisOpenedID: null
  }
  constructor(props) {
    super(props)

    this.openAvis = this.openAvis.bind(this);
    this.back = this.back.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderAvis = this.renderAvis.bind(this);
    this.toggleSolve = this.toggleSolve.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }
  openAvis(selectedID) {
    this.setState({avisOpenedID: selectedID});
  }
  back() {
    this.setState({avisOpenedID: null});
  }
  toggleSolve() {
    console.log("here");
    const { avisOpenedID } = this.state;
    var avisOpened = 0

    this.state.avis.map((item, key) => {
      if (item._id === this.state.avisOpenedID) {
        avisOpened = item;
      }
    })

    avisOpened.solved = !avisOpened.solved

    store.dispatch({type: 'EDIT_AVIS', data: avisOpened})
  }
  sortBy(label) {
    const { avis } = this.state;

    if (label === 'type') {
      var positives = avis.filter(item => item.type === 'positive');
      var negatives = avis.filter(item => item.type === 'negative');
      this.setState({avis: positives.concat(negatives)});
      return 0;
    }

    if (label === 'solved') {
      var solved = avis.filter(item => item.solved === true);
      var unsolved = avis.filter(item => item.solved === false);
      this.setState({avis: unsolved.concat(solved)});
      return 0;
    }

    if (label === 'date') {
      avis.sort(function(a, b) {
        return (new Date(b.date) - new Date(a.date))
      })
      this.setState({avis: avis});
    }
  }
  componentDidMount() {
    store.subscribe(() => this.setState({avis: store.getState().avis.avis}))
    store.dispatch({type: 'GET_AVIS'})

    this.state.avis.map((item, key) => {
      item.solved = false
      store.dispatch({type: 'EDIT_AVIS', data: item})
    })
  }
  render() {
    if (this.state.avisOpenedID != null) {
      return this.renderAvis()
    } else {
      return this.renderList()
    }
  }
  renderAvis() {
    var avisOpened = 0
    this.state.avis.map((item, key) => {
      if (item._id === this.state.avisOpenedID) {
        avisOpened = item;
      }
    })
    return (
      <AvisOpen toggleSolve={this.toggleSolve} back={this.back} avis={avisOpened}/>
    )
  }
  renderList() {
    return(
      <div style={styles.container}>
        <h1 style={{textAlign: 'center'}}>Les Avis Des Résidents</h1>
        <List sortBy={this.sortBy} openAvis={this.openAvis} avis={this.state.avis}/>
      </div>
    )
  }
}

const styles = {
  container: {
    padding: '0 2em'
  }
}

//lister tout les avis
// => trier par positif / négatif
//accéder aux avis par résident
//Sortir un graphique de satisfaction
//pouvoir répondre
//pouvoir imprimer pour le donner au résident
//le résident doit pouvoir y avoir accès
