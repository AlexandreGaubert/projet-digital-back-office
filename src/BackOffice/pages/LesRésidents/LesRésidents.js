import React, { Component } from "react"

import { store } from '../../../redux/store'
import ListDesResidents from './ListDesResidents'
import FormResident from './FormResident'
import Modal from '../../components/Modal'
import AddButton from '../../components/AddButton'
import DeletePopup from '../../components/DeletePopup'

export default class LesRésidents extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)

    this.state = {
      residents: store.getState().residents.residents,
      sortedResidentsList: store.getState().residents.residents,
      nameInput: ''
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {this.setState({sortedResidentsList: store.getState().residents.residents, residents: store.getState().residents.residents})})
    store.dispatch({type: 'GET_RESIDENT', data: null})
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  openModal(modal, residentSelected) {
    this.setState({[modal + 'IsOpen'] : true, residentSelected: residentSelected});
  }
  closeModal(modal) {
    this.setState({[modal + 'IsOpen'] : false});
  }
  handleNameInputChange(e) {
    const name = e.target.value;
    var sorted = [];

    this.state.residents.map(resident => {
      if (resident.lastname.toUpperCase().indexOf(name.toUpperCase()) >= 0 || resident.lastname.toLowerCase().indexOf(name.toLowerCase()) >= 0 )
        return sorted.push(resident)

      if (resident.firstname.toUpperCase().indexOf(name.toUpperCase()) >= 0 || resident.firstname.toLowerCase().indexOf(name.toLowerCase()) >= 0 )
        return sorted.push(resident)

      if (resident.room.indexOf(name) >= 0)
        return sorted.push(resident)

      return 0;
    })

    this.setState({nameInput: e.target.value, sortedResidentsList: sorted});
  }
  render() {
    const { sortedResidentsList, residentSelected } = this.state;

    return(
      <div style={styles.container}>
        <AddButton action={() => this.openModal('addResident')}/>
        <input
          placeholder="Entrez un nom, un prénom, ou un numéro de chambre..."
          value={this.state.nameInput}
          onChange={this.handleNameInputChange}
          style={styles.nameInput}
        />
        <ListDesResidents openModal={this.openModal} residents={sortedResidentsList}/>

        <Modal isOpen={this.state.addResidentIsOpen} onClose={() => this.closeModal('addResident')}>
          <FormResident type={'create'}/>
        </Modal>
        <Modal isOpen={this.state.editResidentIsOpen} onClose={() => this.closeModal('editResident')}>
          <FormResident data={residentSelected} type={'edit'}/>
        </Modal>
        <Modal isOpen={this.state.deleteResidentIsOpen} onClose={() => this.closeModal('deleteResident')}>
          <DeletePopup no={() => this.closeModal('deleteResident')} yes={() => {store.dispatch({type: 'DELETE_RESIDENT', data: residentSelected }); this.closeModal('deleteResident')}}/>
        </Modal>
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  nameInput: {
    width: '80%',
    margin: '1em auto',
    fontSize: '2vw',
    padding: '.5em 1em'
  }
}
