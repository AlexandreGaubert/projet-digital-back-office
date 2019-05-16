import React, { Component } from "react"

import Button from '../../components/reusable/Button'
import {store} from '../../../redux/store'

export default class FormSectionDescription extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    this.socket = document.socket;
    this.state = {
      description: this.props.description,
      section: this.props.section,
    }

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  submit() {
    store.dispatch({type: 'EDIT_SECTION_DESCRIPTION', data: this.state})
    this.props.onClose()
  }
  render() {
    const { description, section } = this.state;

    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-pencil-alt"}/>
          Editer la description pour {section}
        </h1>
        <textarea
          type='text'
          value={description}
          name="description"
          onChange={this.onChange}
          style={styles.input}
        />
        <Button action={this.submit} text={"EDITER"} style={styles.button}/>
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
