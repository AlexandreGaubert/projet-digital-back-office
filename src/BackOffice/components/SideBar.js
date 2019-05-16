import React, { Component } from "react"
import { Link, withRouter } from 'react-router-dom'

class SideBar extends Component {
  static defaultProps = {

  }
  state = {

  }
  constructor(props) {
    super(props)

  }
  render() {
    const currentPage = this.props.location.pathname;

    return(
      <div style={styles.container}>
        <ul style={styles.list}>

          <span style={styles.label}>TÉLÉVISEUR</span>
          <Item name="Les Menus" icon="fas fa-utensils" path="/back-office/les-menus" currentPage={currentPage}/>
          <Item name="Les Activités" icon="fas fa-calendar" path="/back-office/les-activités" currentPage={currentPage}/>
          <Item name="Les Nouvelles" icon="fas fa-info-circle" path="/back-office/les-news" currentPage={currentPage}/>
          <Item name="La Galerie" icon="fas fa-images" path="/back-office/la-gallerie" currentPage={currentPage}/>
          <Item name="Les Avis" icon="fas fa-pencil-alt" path="/back-office/les-avis" currentPage={currentPage}/>
          <span style={styles.label}>AUTRES</span>
          <Item name="Les Résidents" icon="fas fa-user" path="/back-office/les-residents" currentPage={currentPage}/>
          <Item name="Le Personnel" icon="fas fa-users" path="/back-office/le-personnel" currentPage={currentPage}/>
        </ul>
      </div>
    )
  }
}

class Item extends Component {
  state = {
    hover: false
  }
  onMouseEnter() {
    this.setState({hover: true});
  }
  onMouseLeave() {
    this.setState({hover: false});
  }
  render() {
    const { name, icon, path } = this.props;
    const { hover } = this.state;
    const selected = this.props.currentPage === path;

    return (
      <li
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        style={{
          ...styles.item,
          backgroundColor: hover || selected ? '#2f383d' : 'inherit'
        }}
      >
        {hover || selected ? <i style={styles.itemLine}/> : null}
        <Link to={path ? path : '/'} style={styles.itemLink}>
          <span style={styles.itemIcon}><i className={icon}/></span>
          {name}
        </Link>
      </li>
    )
  }
}

const styles = {
  container: {
    width: '20vw',
    backgroundColor: '#1f282d',
    padding: 0,
    margin: 0
  },
  list: {
    listStyle: 'none',
    padding: 0,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 0,
    fontSize: '1.7vw',
    height: '-webkit-fill-available',
    width: 'inherit',
    marginTop: '10vh'
  },
  label: {
    textAlign: 'left',
    padding: '1em',
  },
  item: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    height: '7vh',
    width: 'inherit',
  },
  itemLink: {
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    height: 'inherit',
    alignItems: 'center'
  },
  itemHover: {
    backgroundColor: 'red'
  },
  itemLine: {
    height: '7vh',
    position: 'absolute',
    left: 0,
    width: "5px",
    backgroundColor: '#6C706E',
  },
  itemIcon: {
    margin: '0 1em',
    height: '1.2em',
    width: '1.2em',
  }
}

export default withRouter(SideBar)
