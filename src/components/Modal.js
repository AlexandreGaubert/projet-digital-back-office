import React, { Component } from "react"

export default class Modal extends Component {
  render() {
    const { isOpen, onClose, children } = this.props
    if (isOpen === true) {
      return (
        <div style={styles.modal}>
          <span style={styles.content}>
            {children}
          </span>
          <span onClick={onClose} style={styles.modalOverlay}/>
        </div>
      )
    }
    else return(null)
  }
}

const styles = {
  modal: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    margin: '5% auto',
    height: 'fit-content',
    zIndex: 1000
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: .25,
    zIndex: '999'
  }
}
