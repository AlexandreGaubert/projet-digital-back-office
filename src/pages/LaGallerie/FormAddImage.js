import React, { Component } from "react"

import Button from '../../components/reusable/Button'

export default class FormAddImage extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const { image } = this.state;
    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-plus"}/>
          {" Ajouter une image"}
        </h1>
        <input
          type='file'
          multiple='multiple'
          value={image}
          name="image"
          onChange={this.onChange}
          placeholder="Votre Image..."
          style={{...styles.input, margin: 0}}
        />
        <Button text="AJOUTER" type='submit' style={styles.button}/>
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
