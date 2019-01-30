import React, { Component } from "react"

export default class Button extends Component {
  static defaultProps = {
    type: 'submit',
  }
  state = {

  }
  constructor(props) {
    super(props)

  }
  onMouseUp() {
    this.setState({pressed: false});
  }
  onMouseDown() {
    this.setState({pressed: true});
  }
  defaultAction() {
    window.confirm('Did you clicked me ?')
  }
  render() {
    const { action, text, type, style, icon } = this.props;
    const { pressed } = this.state;

    var mergedStyle = {
      ...style,
      backgroundColor: colors[type],
      transition: 'transform .1s',
      transform: pressed ? 'scale(0.95)' : 'scale(1)',
      cursor: 'pointer',
      color: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }

    const iconStyle = {
      margin: '0 .5em'
    }
    return (
      <span
        style={mergedStyle}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onClick={action}
      >
        {icon && <i style={iconStyle} className={`fas fa-${icon}`}/>}
        {text ? text : 'CLICK ME'}
      </span>
    );
  }
}

const colors = {
  submit: '#7BAE7F',
  danger: '#BA3F1D',
  warning: '#FBFF30'
}

const styles = {
  button: {
    width: '100%'
  },
}
