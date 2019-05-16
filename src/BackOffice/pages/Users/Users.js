import React from 'react'
import PropTypes from 'prop-types'

import { store } from '../../../redux/store'
import AddButton from '../../components/AddButton'
import Modal from '../../components/Modal'
import EditAndDeleteButtons from '../../components/EditAndDeleteButtons'
import DeletePopup from '../../components/DeletePopup'
import FormUser from './FormUser'
import './Users.css'

class Users extends React.Component {
  state = {
    users: []
  }
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
  }
  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        users: store.getState().users.users
      });
    })
    store.dispatch({type: 'GET_USER', data: null})
  }
  componentWilUnmount() {
    this.unsub();
  }
  openModal(modal, userSelected) {
    this.setState({
      [modal + 'IsOpen']: true,
      userSelected
    });
  }
  closeModal(modal) {
    this.setState({
      [modal + 'IsOpen']: false
    });
  }
  render () {
    const { userSelected } = this.state;

    return (
      <div id="Users">
        <AddButton action={() => this.openModal("create")}/>
        {this.state.users.map((user, key) => {
          return <User user={user} openModal={this.openModal}/>
        })}
        <Modal isOpen={this.state.createIsOpen} onClose={() => this.closeModal('create')}>
          <FormUser type="create" onClose={() => this.closeModal('create')}/>
        </Modal>
        <Modal isOpen={this.state.editIsOpen} onClose={() => this.closeModal('edit')}>
          <FormUser type="edit" data={userSelected} onClose={() => this.closeModal('edit')}/>
        </Modal>
        <Modal isOpen={this.state.deleteIsOpen} onClose={() => this.closeModal('delete')}>
          <DeletePopup
            yes={() => {
              store.dispatch({type: "DELETE_USER", data: userSelected._id});
              this.closeModal('delete')
            }}
            no={() => this.closeModal('delete')}/>
        </Modal>
      </div>
    )
  }
}

class User extends React.Component {
  state = {
    hover : false
  }
  hoverOn() {
    this.setState({hover: true});
  }
  hoverOff() {
    this.setState({hover: false});
  }
  render () {
    const { user, openModal } = this.props;
    const { hover } = this.state;

    return (
      <div onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)} id="UserItem">
        <img src={user.photo.length > 0 ? `http://localhost:8080/${user.photo}` : require('./user.png')}/>
        <h1 className="username">{user.username}</h1>
        {hover && <EditAndDeleteButtons edit={() => openModal('edit', user)} delete={() => openModal('delete', user)}/>}
      </div>
    )
  }
}

export default Users;
