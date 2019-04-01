import React, {Component} from 'react'

export function withHover(Component) {
  return class extends Component {
    state = {
      hover: false
    }
    onMouseEnter(){
      this.setState({hover: true});
    }
    onMouseLeave(){
      this.setState({hover: false});
    }
    render() {
      return (
        <Component onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} {...this.props} hover={this.state.hover}/>
      )
    }
  }
}
