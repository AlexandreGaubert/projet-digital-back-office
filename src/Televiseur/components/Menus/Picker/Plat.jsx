import React from 'react'
import PropTypes from 'prop-types'

import './Picker.css';

class MenusPickerPlat extends React.Component {
  render () {
    const { platIndex, platLabel, selected, selectPlat, bgColor } = this.props;

    return(
      <span
        style={{transform: selected ? 'scale(1.1)' : 'scale(1)', backgroundColor: bgColor}}
        className="picker-plat"
        onClick={() => selectPlat(platIndex)}
      >
        {platLabel}
      </span>
    )
  }
}

export default MenusPickerPlat;
