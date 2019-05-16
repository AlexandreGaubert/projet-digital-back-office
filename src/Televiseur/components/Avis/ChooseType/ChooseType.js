import React from 'react'
import PropTypes from 'prop-types'

class AvisChooseType extends React.Component {
  render () {
    return (
      <div id="AvisChooseType">
        <span className="AvisChooseType-button" onClick={() => this.handleChoiceChange("positif")}>
          
        </span>
      </div>
    )
  }
}

export default AvisChooseType;
