import React, { Component } from "react"

export default class Modal extends Component {
  render() {
    const { isOpen, onClose, children } = this.props

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onClose: onClose })
    );
    if (isOpen === true) {
      return (
        <div style={styles.modal}>
          <span style={styles.content}>
            {childrenWithProps}
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
    position: 'fixed',
    display: 'flex',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000000
  },
  content: {
    margin: 'auto',
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
