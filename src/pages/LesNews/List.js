import React, { Component } from "react"

import ItemNews from './ItemNews'

export default class List extends Component {
  static defaultProps = {

  }
  state = {

  }
  constructor(props) {
    super(props)

  }
  render() {
    const { news } = this.props;
    
    return(
      <div style={styles.container}>
        {
          news.map((nw, key) => {
            return <ItemNews bgColor={colors[Math.floor(Math.random() * Math.floor(6))]} openModal={this.props.openModal} data={nw} index={key}/>
          })
        }
      </div>
    )
  }
}

const colors = ["#0cce6b", "#38b6ff", "#dced31", '#ed8ba3', "#a6a6a6", "#ffbd59"]

const styles = {
  container: {
  }
}
