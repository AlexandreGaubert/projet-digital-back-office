import React, { Component } from "react"

import ComposeMenu from './ComposeMenu'
import List from './List'
import './styles.css'


const menus = [
  {
    from: "2019-01-28",
    to: "2019-02-01",
    plat_1: "escaloppe à la crème",
    plat_2: 'cordon bleu',
    plat_3: 'Jambon',
    entree_1: 'coquillettes',
    entree_2: 'chou farci'
  },
  {
    from: "2019-01-28",
    to: "2019-02-01",
    plat_1: "escaloppe à la crème",
    plat_2: 'cordon bleu',
    plat_3: 'Jambon',
    entree_1: 'coquillettes',
    entree_2: 'chou farci'
  },
  {
    from: "2019-01-28",
    to: "2019-02-01",
    plat_1: "escaloppe à la crème",
    plat_2: 'cordon bleu',
    plat_3: 'Jambon',
    entree_1: 'coquillettes',
    entree_2: 'chou farci'
  },
  {
    from: "2019-01-28",
    to: "2019-02-01",
    plat_1: "escaloppe à la crème",
    plat_2: 'cordon bleu',
    plat_3: 'Jambon',
    entree_1: 'coquillettes',
    entree_2: 'chou farci'
  },
]

export default class LesMenus extends Component {
  static defaultProps = {

  }
  state = {
    selected: 'menus'
  }
  constructor(props) {
    super(props)

  }
  select(selected) {
    if (selected === this.state.selected) return;
    this.setState({selected: selected});
  }

  render() {
    const { selected } = this.state;
    return(
      <div style={styles.container}>
        <List menus={menus}/>
      </div>
    )
  }
}

const styles = {
  container: {
    fontSize: '1.7vw'
  },
  nav: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    height: '2em',
    borderRadius: '20px',
    margin: 'auto',
    backgroundColor: '#181F1C',
    marginTop: '2em',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    color: 'white',
    cursor: 'pointer'
  }
}
