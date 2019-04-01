import React from 'react'
import PropTypes from 'prop-types'

const colors = ["#0cce6b", "#38b6ff", "#dced31", '#ed8ba3', "#a6a6a6", "#ffbd59"]

class SelectColor extends React.Component {
  componentDidMount() {
    this.props.action(colors[0])
  }
  render () {
    return (
      <span style={styles.colorPicker}>
        {colors.map((color, key) =>{
            return(
              <span
                key={key}
                style={{
                  ...styles.colorItem,
                  backgroundColor: color,
                  transform: this.props.selected === color ? "scale(1.2)" : 'scale(1)'
                }}
                onClick={() => this.props.action(color)}/>
            )
        })}
      </span>
    )
  }
}

const styles = {
  colorPicker: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto'
  },
  colorItem: {
    width: '2em',
    height: '2em',
    margin: '0 .2em',
    cursor: 'pointer',
    transition: 'all .2s'
  }
}

export default SelectColor;
