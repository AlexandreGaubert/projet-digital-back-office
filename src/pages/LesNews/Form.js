import React, { Component } from "react"

import Button from '../../components/reusable/Button'
import {store} from '../../redux/store'
import {createNews} from '../../redux/actions/newActions'

export default class Form extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    this.socket = document.socket;
    if (props.type === "create") {
      this.state = {
        titre: '',
        body: '',
        date: new Date().toISOString().slice(0, 10)
      }
    }
    else if (props.type === "edit") {
      this.state = {
        ...props.data,
        date: new Date(props.data.date).toISOString().slice(0, 10)
      }
    }
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  submit() {
    if (this.props.type === 'create')
      store.dispatch({type: 'CREATE_NEWS', data: this.state})
    else
      store.dispatch({type: 'EDIT_NEWS', data: this.state})
  }
  render() {
    const { title, date, body } = this.state;
    const { type } = this.props;
    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-" + (type === 'edit' ? "pencil-alt" : "plus")}/>
          {(type === "create" ? " Ajouter" : (type === "edit" ? " Editer" : null)) + " une News"}
        </h1>
        <input
          value={title}
          name="title"
          onChange={this.onChange}
          placeholder="Titre..."
          style={{...styles.input, margin: 0}}
        />
        <textarea
          value={this.state.body}
          name="body"
          onChange={this.onChange}
          style={{...styles.input, height: '20vh', width: '40vw'}}
        />
        <input
          value={this.state.date}
          name="date"
          onChange={this.onChange}
          style={{...styles.input, marginTop: 0}}
          type="date"
        />
        <Button action={this.submit} text={type === 'create' ? "AJOUTER" : (type === 'edit' ? "EDITER" : null)} style={styles.button}/>
      </div>
    )
  }
}

function hello() {
  console.log('hello');
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
    margin: '1em 0',
    fontSize: '1.5em',
    padding: '.5em'
  },
  button: {
    padding: '.5em 0',
    fontSize: '1.5em',
    margin: '.5em 0'
  }
}
