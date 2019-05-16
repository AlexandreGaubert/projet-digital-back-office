import React, { Component } from "react"
import SocketIOFileUpload from 'socketio-file-upload';

import Button from '../../components/reusable/Button'
import {store} from '../../../redux/store'

export default class FormResident extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    this.socket = document.socket;
    if (props.type === "create") {
      this.state = {
        firstname: '',
        lastname: '',
        photo: '',
        room: '',
        gender: 'Mr'
      }
    }
    else if (props.type === "edit") {
      this.state = {
        ...props.data,
      }
    }
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  onChange(e) {
    if (e.target.name === "photo") {
      this.setState({photo: e.target.files[0].name});
      return ;
    }
    this.setState({[e.target.name]: e.target.value});
  }
  submit() {
    if (this.props.type === 'create')
      store.dispatch({type: 'CREATE_RESIDENT', data: this.state})
    else
      store.dispatch({type: 'EDIT_RESIDENT', data: this.state})
    this.props.onClose()
  }
  componentDidMount() {
    var uploader = new SocketIOFileUpload(this.socket);
    uploader.listenOnSubmit(document.getElementById("employee_form_submit"), document.getElementById("employee_form_file_input"));
  }
  render() {
    const { lastname, firstname, room, gender } = this.state;
    const { type } = this.props;

    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-" + (type === 'edit' ? "pencil-alt" : "plus")}/>
          {(type === "create" ? " Ajouter" : (type === "edit" ? " Editer" : null)) + " un Résident"}
        </h1>
        <select style={styles.input} name="gender" value={gender} onChange={this.onChange}>
          <option value={'Mr'}>Mr.</option>
          <option value={'Mme'}>Mme.</option>
        </select>
        <input
          value={firstname}
          name="firstname"
          onChange={this.onChange}
          placeholder="Prénom..."
          style={styles.input}
        />
        <input
          value={lastname}
          name="lastname"
          onChange={this.onChange}
          placeholder="Nom..."
          style={styles.input}
        />
        <input
          type="number"
          value={room}
          name="room"
          onChange={this.onChange}
          placeholder="Chambre..."
          style={styles.input}
        />
        <input
          type="file"
          name="photo"
          onChange={this.onChange}
          style={styles.input}
          id="employee_form_file_input"
        />
        <Button action={this.submit} id="employee_form_submit" text={type === 'create' ? "AJOUTER" : (type === 'edit' ? "EDITER" : null)} style={styles.button}/>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eaedf2',
    padding: '0 1em',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',

  },
  title: {
    borderBottom: '2px solid #ccc',
    paddingBottom: '.5em'
  },
  input: {
    margin: '.5em 0',
    fontSize: '1.5em',
    padding: '.5em'
  },
  button: {
    padding: '.5em 0',
    fontSize: '1.5em',
    margin: '.5em 0'
  }
}
