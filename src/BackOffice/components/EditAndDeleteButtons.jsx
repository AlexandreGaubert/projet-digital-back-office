import React, { Component } from "react"

export default class EditAndDeleteButtons extends Component {
  static defaultProps = {
    edit: () => alert("No edit action was defined"),
    delete: () => alert("No delete action was defined"),
  }
  state = {}

  render() {
    return(
      <span style={styles.buttonGroup}>
        <span onClick={this.props.edit} style={{...styles.button, backgroundColor: '#5188D8'}}><i className="fas fa-pencil-alt"/></span>
        <span onClick={this.props.delete} style={{...styles.button, backgroundColor: '#BA3F1D'}}><i className="fas fa-trash"/></span>
      </span>
    )
  }
}

const styles = {
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: '.5em',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto 0'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto .2em',
    padding: '.3em',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    borderRadius: '100%',
    cursor: 'pointer',
    fontSize: '1.5em',
    color: '#eaedf2'
  }
}
