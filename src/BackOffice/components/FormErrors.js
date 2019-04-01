import React, { Component } from "react"

export default class formErrors extends Component {
  render() {
    const { formErrors } = this.props;
    return(
      <div style={styles.container}>
        { Object.keys(formErrors).map((fieldName, i) => {
          if(formErrors[fieldName].length > 0){
            return (
              <p style={styles.message} key={i}>{formErrors[fieldName]}</p>
            )
            } else {
              return '';
          }
        })}
      </div>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    backgroundColor: 'rgb(255, 0, 0, .7)',
    color: 'white',
    borderRadius: '10px',
    fontWeight: 'bold'
  },
  message: {

  }
}
