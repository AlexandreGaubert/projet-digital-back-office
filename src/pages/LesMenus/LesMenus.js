import React, { Component } from "react"

import Menus from './Menus'
import Results from './Results'
import './styles.css'

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

        <div style={styles.nav}>
          <span onClick={() => this.select("menus")} className={"navItem"} style={{...styles.navItem, borderRadius: '20px 0 0 20px'}}>Menus</span>
          <span onClick={() => this.select("results")} className={"navItem"} style={{...styles.navItem, borderRadius: '0 20px 20px 0'}}>Grille</span>
        </div>

        {selected === "menus" ? <Menus/> : selected === "results" ? <Results/> : null}
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
