import React, { Component } from "react"

import List from './List';
import Form from './Form';
import Modal from '../../components/Modal'
import Button from '../../components/reusable/Button'
import { getNews } from '../../redux/actions/newActions'
import { store } from '../../redux/store'

class LesNews extends Component {
  static defaultProps = {

  }
  state = {
    editIsOpen: false,
    addIsOpen: false,
    deleteIsOpen: false,
    news: store.getState().news.news
  }
  constructor(props) {
    super(props)

    this.socket = document.socket;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.delete = this.delete.bind(this);
  }
  openModal(modal, data) {
    this.setState({[modal + "IsOpen"] : true, newsData: data});
  }
  closeModal() {
    this.setState({editIsOpen: false, addIsOpen: false, deleteIsOpen: false});
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      var news = store.getState().news.news;

      news.sort((a, b) => {
        return (new Date(b.date) - new Date(a.date))
      })

      this.setState({news: news});
    })
    store.dispatch(getNews())
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  delete() {
    store.dispatch({type: 'DELETE_NEWS', data: this.state.newsData._id})
    this.closeModal()
  }
  render() {
    const { editIsOpen, addIsOpen, deleteIsOpen, newsData, news } = this.state;
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
    padding: '0 2em'
  },
  addBtnWrapper: {
    display: 'flex',
    cursor: 'pointer',
    fontSize: '2vw',
    marginRight: 'auto',
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
