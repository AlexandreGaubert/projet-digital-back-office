import React, { Component } from "react"

export default class Header extends Component {
  static defaultProps = {

  }
  state = {

  }
  constructor(props) {
    super(props)

  }
  render() {
    return(
      <div style={styles.container}>
        <Profile/>
      </div>
    )
  }
}

class Profile extends Component {
  state = {
    menuOpen: false
  }
  openMenu() {
    console.log("closing");

    this.setState({menuOpen: true});
  }
  closeMenu() {
    console.log("closing");
    this.setState({menuOpen: false});
  }
  render() {
    const { menuOpen } = this.state;
    console.log(menuOpen);
    return (
      <div style={{display: 'flex', width: '100%'}}>
        <span onClick={this.openMenu.bind(this)} style={styles.profile}>
          {"Alexandre Gaubert"}
          <img style={styles.picture} src={require('../assets/images/profile.png')}/>

          <ul hidden={!menuOpen} style={styles.menu}>
            <Item name="Mon Compte" icon="fas fa-cog"/>
            <Item name="Déconnexion" icon="fas fa-sign-out-alt"/>
          </ul>
        </span>
        <span hidden={!menuOpen} onClick={this.closeMenu.bind(this)} style={styles.menuOverlay}/>
      </div>
    )
  }
}

class Item extends Component {
  state = {
    hover: false
  }
  onMouseOver() {
    this.setState({hover: true});
  }
  onMouseLeave() {
    this.setState({hover: false});
  }
  render() {
    const { name, icon } = this.props;
    const { hover } = this.state;
    return (
      <li
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        style={{
          ...styles.menuItem,
          backgroundColor: hover ? '#2f383d' : 'inherit'
        }}
      >
        {hover ? <i style={styles.menuItemLine}/> : null}
        <span style={{display: 'flex', alignItems: 'baseline'}}>
          <i style={styles.menuItemIcon} className={icon}/>
          {name}
        </span>
      </li>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    backgroundColor: '#1f282d',
    color: 'white',
    fontSize: '2vw'
  },
  logo: {
    marginLeft: 'auto'
  },
  profile: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  picture: {
    height: '10vh',
    borderRadius: '45em',
    margin: '.5em',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#1f282d',
    right: '2vw',
    top: '12vh',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    zIndex: '1000',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  menuItem: {
    height: '7vh',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '.5em',
  },
  menuItemLine: {
    height: '7vh',
    position: 'absolute',
    left: 0,
    width: "5px",
    backgroundColor: '#6C706E',
  },
  menuItemIcon: {
    margin: '0 .5em'
  },
  menuOverlay: {
    position: 'absolute',
    zIndex: '999',
    left: 0,
    top: 0,
    width: '-webkit-fill-available',
    height: '-webkit-fill-available',
    backgroundColor: 'black',
    opacity: '.5'
  }
}
