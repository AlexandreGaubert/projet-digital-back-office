import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import styles from './TrouverResident.module.css'
import NavBar from '../../components/NavBar/NavBar'
import AutocompleteInput from '../../components/AutocompleteInput/AutocompleteInput'
import { store } from '../../../redux/store'

class ScreensTrouverResident extends React.Component {
  state = {
    residents: [],
    selectedResident: {}
  }
  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState({residents: store.getState().residents.residents});
    })
    store.dispatch({type: 'GET_RESIDENT', data: null})
  }
  selectResident(selectedResident) {
    this.setState({selectedResident});
  }
  canItShowDetails() {
    if (typeof this.state.selectedResident._id == 'undefined') alert('Vous devez choisir un résident dans la liste.')
    else {
      this.props.history.push('/borne/trouver-un-resident/details', {resident: this.state.selectedResident})
    }
  }
  render () {
    console.log(this.state.residents);
    return(
      <div id={styles.ScreensTrouverResident}>
        <NavBar
          title="Trouver Un Résident"
          color="#dced31"
          />
        <span
          className={styles.link}
          onClick={this.canItShowDetails.bind(this)}
          >
          <i className="fas fa-search"/>
          TROUVER
        </span>
        <div className={styles["autocomplete-container"]}>
          <AutocompleteInput
            selectResident={this.selectResident.bind(this)}
            list={this.state.residents}
            />
        </div>
      </div>
    )
  }
}

export default withRouter(ScreensTrouverResident);
