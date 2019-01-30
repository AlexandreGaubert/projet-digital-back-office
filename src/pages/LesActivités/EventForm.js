import React, { Component } from "react"

import Button from '../../components/reusable/Button'

export default class EventForm extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    if (props.type === "create") {
      this.state = {
        name: '',
        salle: '',
        date: new Date().toISOString().slice(0, 10)
      }
    }
    else if (props.type === "edit") {
      this.state = {
        ...props.eventData,
        date: new Date(props.eventData.date).toISOString().slice(0, 10)
      }
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const { name, date, salle } = this.state;
    const { type } = this.props;
    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-" + (type === 'edit' ? "pencil-alt" : "plus")}/>
          {(type === "create" ? " Ajouter" : (type === "edit" ? " Editer" : null)) + " un évènement"}
        </h1>
        <input
          value={name}
          name="name"
          onChange={this.onChange}
          placeholder="Nom..."
          style={{...styles.input, margin: 0}}
        />
        <span style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
          <select name="salle" selected={salle} onChange={this.onChange} style={{...styles.input, width: '45%'}}>
            <option>Loisir</option>
            <option>Restaurant</option>
            <option>Invités</option>
          </select>
          <input
            value={this.state.date}
            name="date"
            onChange={this.onChange}
            style={{...styles.input, width: '45%'}}
            type="date"
          />
        </span>
        <Button text={type === 'create' ? "AJOUTER" : (type === 'edit' ? "EDITER" : null)} type='submit' style={styles.button}/>
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
