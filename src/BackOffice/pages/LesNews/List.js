import React, { Component } from "react"

import ItemNews from './ItemNews'

export default class List extends Component {
  static defaultProps = {}
  state = {}
  
  render() {
    const { news } = this.props;

    return(
      <div style={styles.container}>
        {
          news.map((nw, key) => {
            return <ItemNews openModal={this.props.openModal} data={nw} index={key}/>
          })
        }
      </div>
    )
  }
}

const styles = {
  container: {
  }
}
