import React, { Component } from "react"
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Header extends Component {
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
        <Profile user={this.props.user} history={this.props.history}/>
      </div>
    )
  }
}

class Profile extends Component {
  state = {
    menuOpen: false
  }
  openMenu() {
    this.setState({menuOpen: true});
  }
  closeMenu() {
    this.setState({menuOpen: false});
  }
  logout() {
    axios.get('http://localhost:8080/logout')
    .then(res => {
      document.location.reload()
    })
  }
  render() {
    const { menuOpen } = this.state;
    const { user } = this.props;

    return (
      <div style={{display: 'flex', width: '100%'}}>
        <span onClick={this.openMenu.bind(this)} style={styles.profile}>
          {user.username}
          <img style={styles.picture} src={user.photo.length > 0 ? `http://localhost:8080/${user.photo}` : require('../assets/images/user.png')}/>


          <ul onClick={this.closeMenu.bind(this)} hidden={!menuOpen} style={styles.menu}>
            <Item name="Mon Compte" icon="fas fa-cog"/>
            {user.isAdmin && <Item action={() => this.props.history.push('/back-office/users')} name="Gérer les accès" icon="fas fa-lock"/>}
            <Item name="Déconnexion" action={this.logout} icon="fas fa-sign-out-alt"/>
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
    const { name, icon, action } = this.props;
    const { hover } = this.state;
    return (
      <li
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onClick={action}
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
    height: '8.5vh',
    width: '8.5vh',
    borderRadius: '100%',
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

export default withRouter(Header)
