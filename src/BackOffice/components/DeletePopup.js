import React, { Component } from 'react';

import Button from './reusable/Button'

class DeletePopup extends Component {
  render() {
    return (
      <span style={styles.deleteModal}>
        <h1>Souhaitez-vous supprimer<br/>cet objet ?</h1>
        <span style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
          <Button action={this.props.no} text="NON" type="warning" style={styles.button}/>
          <Button action={this.props.yes} text="OUI" type="danger" style={styles.button}/>
        </span>
      </span>
    );
  }
}

const styles = {
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

export default DeletePopup;
