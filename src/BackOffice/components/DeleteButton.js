import React, { Component } from "react"

export default class DeleteButton extends Component {
  static defaultProps = {

  }
  state = {

  }
  constructor(props) {
    super(props)

  }
  render() {
    const { action } = this.props;

    return(
      <div style={styles.wrapper}>
        <i onClick={action} className="fas fa-trash" style={styles.btn}/>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    cursor: 'pointer',
    fontSize: '2vw',
    margin: '1em auto 0 1em',
    width: 'max-content',
  },
  btn: {
    padding: '.5em',
    borderRadius: '100%',
    color: 'white',
    backgroundColor: 'red',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
  }
}
