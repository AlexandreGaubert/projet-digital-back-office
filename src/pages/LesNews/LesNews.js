import React, { Component } from "react"

import List from './List';
import Form from './Form';
import Modal from '../../components/Modal'
import Button from '../../components/reusable/Button'

const news = [
  {
    title: "La passerelle est démontée",
    body: "Pour le moment il faudra passer par la porte exterieur merci de votre compréhension Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date("2019-01-12")
  },
  {
    title: "Venez prendre votre code Famileo",
    body: "Venez demander votre code Famileo au secreteriat, vous pourrez le communiquer à votre famille afin qu'elle puisse vous envoyer de leurs nouvelles",
    date: new Date("2018-11-26")
  },
  {
    title: "Le père noël arrive avec son traineau de rennes !",
    body: "Il passera avec son traineau cet après midi devant la résidence, il s'arretra et vous pourrez prendre une photo avec lui et demander des cadeaux !",
    date: new Date("2018-11-20")
  }
]

class LesNews extends Component {
  static defaultProps = {

  }
  state = {
    editIsOpen: false,
    addIsOpen: false,
    deleteIsOpen: false,
  }
  constructor(props) {
    super(props)

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal(modal, data) {
    this.setState({[modal + "IsOpen"] : true, newsData: data});
  }
  closeModal() {
    this.setState({editIsOpen: false, addIsOpen: false, deleteIsOpen: false});
  }
  render() {
    const { editIsOpen, addIsOpen, deleteIsOpen, newsData } = this.state;
    return(
      <div style={styles.container}>
        <span style={styles.addBtnWrapper}>
          <i onClick={() => this.openModal('add')} className="fas fa-plus" style={styles.addBtn}/>
        </span>

        <List openModal={this.openModal} news={news}/>

        <Modal onClose={this.closeModal} isOpen={addIsOpen}>
          <Form type='create'/>
        </Modal>
        <Modal onClose={this.closeModal} isOpen={editIsOpen}>
          <Form type="edit" data={newsData}/>
        </Modal>
        <Modal onClose={this.closeModal} isOpen={deleteIsOpen}>
          <span style={styles.deleteModal}>
            <h1>Souhaitez-vous supprimer<br/>cette info ?</h1>
            <span style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
              <Button text="NON" type="warning" style={styles.button}/>
              <Button text="OUI" type="danger" style={styles.button}/>
            </span>
          </span>
        </Modal>
      </div>
    )
  }
}

const styles = {
  container: {
    padding: '0 2em'
  },
  addBtnWrapper: {
    display: 'flex',
    cursor: 'pointer',
    fontSize: '2vw',
    marginLeft: 'auto',
    width: 'max-content',
    marginTop: '.5em'
  },
  addBtn: {
    padding: '.5em',
    borderRadius: '100%',
    color: 'white',
    backgroundColor: '#2f383d',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
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

export default LesNews
