import React, {Component} from 'react'

import Modal from '../components/Modal'

export function withCRUDLModal(Component, Form) {
  return class extends Component {
    state = {
      editIsOpen: false,
      addIsOpen: false,
      deleteIsOpen: false
    }
    openModal(type) {
      this.setState({[type + 'IsOpen']: true});
    }
    closeModal() {
      this.setState({editIsOpen: false, deleteIsOpen: false, addIsOpen: false});
    }
    render() {
      const { editIsOpen, addIsOpen, deleteIsOpen } = this.state;
      return (
        <Component {...this.props} openModal={this.openModal.bind(this)}>
          <Modal onClose={this.closeModal.bind(this)} isOpen={addIsOpen}>
            <Form type="create"/>
          </Modal>
          <Modal onClose={this.closeModal.bind(this)} isOpen={editIsOpen}>
            <Form type="edit"/>
          </Modal>
          <Modal onClose={this.closeModal.bind(this)} isOpen={deleteIsOpen}>
            <Form type="delete"/>
          </Modal>
        </Component>
      )
    }
  }
}
