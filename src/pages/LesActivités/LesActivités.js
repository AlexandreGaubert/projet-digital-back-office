import React, { Component } from "react"

import EventForm from './EventForm'
import Table from './Table'
import Modal from '../../components/Modal'
import DeletePopup from '../../components/DeletePopup'
import Button from '../../components/reusable/Button'

const animations = [
  {name: "mardi de l'ourme", salle: 'salle de loisir', date: new Date("12/01/2019")},
  {name: "mardi de l'ourme", salle: 'salle de loisir', date: new Date("12/11/2019")},
  {name: "mardi de l'ourme", salle: 'salle de loisir', date: new Date("12/13/2019")},
  {name: "mardi de l'ourme", salle: 'salle de loisir', date: new Date("12/29/2019")}
]

export default class LesActivités extends Component {
  state = {
    isEdit: false,
    isAdd: false,
    isDelete: false,
    rowData: null
  }
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal(modal, rowData) {
    this.setState({[modal + 'IsOpen'] : true, rowData: rowData});
  }
  closeModal() {
    this.setState({editIsOpen: false, addIsOpen: false, deleteIsOpen: false});
  }
  render() {
    const { editIsOpen, addIsOpen, deleteIsOpen, rowData } = this.state;
    return(
      <div style={styles.container}>

        <Table
          openModal={this.openModal}
          animations={animations}
        />

        <Modal onClose={this.closeModal.bind(this)} isOpen={addIsOpen}>
          <EventForm type="create"/>
        </Modal>

        <Modal onClose={this.closeModal.bind(this)} isOpen={editIsOpen}>
          <EventForm type="edit" eventData={rowData}/>
        </Modal>

        <Modal onClose={this.closeModal.bind(this)} isOpen={deleteIsOpen}>
          <DeletePopup no={this.closeModal.bind(this)}/>
        </Modal>

      </div>
    )
  }
}

const styles = {
  container: {
    padding: '3em'
  },
  deleteModal: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eaedf2',
    padding: '0 1em',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  button: {
    fontSize: '3vw',
    padding: '.2em',
    margin: '.5em 0',
    width: '30%'
  }
}
