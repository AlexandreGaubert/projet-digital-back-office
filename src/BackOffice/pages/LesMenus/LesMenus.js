import React, { Component } from "react"

import Form from './Form'
import List from './List'
import './styles.css'

import Button from '../../components/reusable/Button'
import Modal from '../../components/Modal'
import {store} from '../../../redux/store'

export default class LesMenus extends Component {
  state = {
    editIsOpen: false,
    addIsOpen: false,
    deleteIsOpen: false,
    menus: store.getState().menus.menus
  }
  constructor(props) {
    super(props)

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    store.subscribe(() => this.setState({menus: store.getState().menus.menus}))
    store.dispatch({type: 'GET_MENU'})
  }
  openModal(modal, data) {
    this.setState({[modal + 'IsOpen']: true, menuData: data});
  }
  closeModal() {
    this.setState({editIsOpen: false, addIsOpen: false, deleteIsOpen: false});
  }
  delete() {
    store.dispatch({type: 'DELETE_MENU', data: this.state.menuData._id})
    this.closeModal()
  }
  render() {
    const { menus, editIsOpen, addIsOpen, deleteIsOpen, menuData } = this.state;

    return(
      <div style={styles.container}>
        <List menus={menus} openModal={this.openModal}/>

        <Modal onClose={this.closeModal} isOpen={addIsOpen}>
          <Form type="create"/>
        </Modal>
        <Modal onClose={this.closeModal} isOpen={editIsOpen}>
          <Form type="edit" data={menuData}/>
        </Modal>
        <Modal onClose={this.closeModal} isOpen={deleteIsOpen}>
          <span style={styles.deleteModal}>
            <h1>Souhaitez-vous supprimer<br/>cette info ?</h1>
            <span style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
              <Button action={this.closeModal} text="NON" type="warning" style={styles.button}/>
              <Button action={this.delete} text="OUI" type="danger" style={styles.button}/>
            </span>
          </span>
        </Modal>
      </div>
    )
  }
}

const styles = {
  container: {
  },
  nav: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    height: '2em',
    borderRadius: '20px',
    margin: 'auto',
    backgroundColor: '#181F1C',
    marginTop: '2em',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    color: 'white',
    cursor: 'pointer'
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
