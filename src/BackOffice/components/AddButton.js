import React, { Component } from "react"

export default class AddButton extends Component {
  static defaultProps = {
    action: () => alert("No action was defined")
  }
  state = {}

  render() {
    const { action } = this.props;

    return(
      <i onClick={action} className="fas fa-plus" style={styles.btn}/>
    )
  }
}

const styles = {
  btn: {
    fontSize: '1.5em',
    position: 'absolute',
    left: '1em',
    top: '1em',
    cursor: 'pointer',
    padding: '.5em',
    borderRadius: '100%',
    color: 'white',
    backgroundColor: '#2f383d',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
  }
}
