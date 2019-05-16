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
        username: '',
        password: '',
        passwordConfirm: '',
        photo: '',
        error: '',
        isAdmin: "false"
      }
    }
    else if (props.type === "edit") {
      this.state = {
        ...props.data,
        error: '',
        password: '',
        passwordConfirm: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  onChange(e) {
    if (e.target.name === "photo") {
      this.setState({photo: e.target.files[0].name});
    }
    else {
      this.setState({[e.target.name]: e.target.value});
    }
  }
  submit() {
    console.log(this.state);
    if (this.state.password === this.state.passwordConfirm) {
      if (this.props.type === 'create')
        store.dispatch({type: 'CREATE_USER', data: this.state})
      else
        store.dispatch({type: 'EDIT_USER', data: this.state})
      this.props.onClose()
    }
    else {
      this.setState({error: "Les mots de passe ne correspondent pas"});
    }
  }
  componentDidMount() {
    var uploader = new SocketIOFileUpload(this.socket);
    uploader.listenOnSubmit(document.getElementById("user_form_submit"), document.getElementById("user_form_file_input"));
  }
  render() {
    const { password, passwordConfirm, username, isAdmin } = this.state;
    const { type } = this.props;

    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-" + (type === 'edit' ? "pencil-alt" : "plus")}/>
          {(type === "create" ? " Ajouter" : (type === "edit" ? " Editer" : null)) + " un utilisateur"}
        </h1>
        <input
          value={username}
          name="username"
          onChange={this.onChange}
          placeholder="Nom d'utilisateur..."
          style={styles.input}
        />
        <input
          value={password}
          name="password"
          onChange={this.onChange}
          placeholder="Mot de passe..."
          style={styles.input}
        />
        <input
          value={passwordConfirm}
          name="passwordConfirm"
          onChange={this.onChange}
          placeholder="Confirmer le mot de passe..."
          style={styles.input}
        />
        <div style={{...styles.input, textAlign: 'left'}}>
          <legend>Donner les droits administrateur ?</legend>
          <div>
            <input onChange={this.onChange} type="checkbox" name="isAdmin" value={true} checked={isAdmin === "true"}/>
            <label>Oui</label>
          </div>
          <div>
            <input onChange={this.onChange} type="checkbox" name="isAdmin" value={false} checked={isAdmin === "false"}/>
            <label>Non</label>
          </div>
        </div>
        <input
          type="file"
          name="photo"
          onChange={this.onChange}
          style={styles.input}
          id="user_form_file_input"
        />
        {this.state.error.length > 0 && <span style={{width: '100%', borderRadius: '10px', backgroundColor: 'rgb(255, 0, 0, .5)', textAlign: 'center', padding: '.5em'}}>{this.state.error}</span>}
        <Button action={this.submit} id="user_form_submit" text={type === 'create' ? "AJOUTER" : (type === 'edit' ? "EDITER" : null)} style={styles.button}/>
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
