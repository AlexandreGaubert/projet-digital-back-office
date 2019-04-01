import React, { Component } from "react"

import EventForm from './EventForm'
import Table from './Table'
import Modal from '../../components/Modal'
import DeletePopup from '../../components/DeletePopup'
import Button from '../../components/reusable/Button'
import { store } from '../../../redux/store'

export default class LesActivités extends Component {
  state = {
    isEdit: false,
    isAdd: false,
    isDelete: false,
    rowData: null,
    activities: []
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
  componentDidMount() {
    var monday = new Date();
    monday.setDate(monday.getDate() - monday.getDay() + 1)

    this.unsubscribe = store.subscribe(() => this.setState({activities: store.getState().activities.activities}))
    store.dispatch({type: 'GET_ACTIVITY', data: {monday: monday.toISOString().slice(0, 10)}})
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    console.log(store.getState());
    const { editIsOpen, addIsOpen, deleteIsOpen, rowData, activities } = this.state;
    return(
      <div style={styles.container}>

        <Table
          openModal={this.openModal}
          animations={activities}
        />

        <Modal onClose={this.closeModal.bind(this)} isOpen={addIsOpen}>
          <EventForm type="create"/>
        </Modal>

        <Modal onClose={this.closeModal.bind(this)} isOpen={editIsOpen}>
          <EventForm type="edit" eventData={rowData}/>
        </Modal>

        <Modal onClose={this.closeModal.bind(this)} isOpen={deleteIsOpen}>
          <DeletePopup yes={() => {this.closeModal(); store.dispatch({type: 'DELETE_ACTIVITY', data: this.state.rowData._id})}} no={this.closeModal.bind(this)}/>
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
