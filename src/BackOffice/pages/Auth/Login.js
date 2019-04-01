import React, { Component } from "react"

import Button from '../../components/reusable/Button'
import { store } from '../../../redux/store'

export default class Login extends Component {
  static defaultProps = {

  }
  state = {
    username: '',
    password: '',
    users: [],
    loginSuccessful: false,
    loginError: null
  }
  onInputChange(e) {
    console.log(e.target.value);
    this.setState({[e.target.name] : e.target.value});
  }
  submit() {
    const { username, password } = this.state;
    store.dispatch({type: 'USER_LOGIN', data: {username: username, password: password}})
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const usersState = store.getState().users;
      this.setState({
        users: usersState.users,
        loginSuccessful: usersState.loginSuccessful,
        loginError: usersState.loginError,
        username: usersState.users.length > 0 ? usersState.users[0].username : ''
      })
    })
    store.dispatch({type: 'GET_USER', data: null})
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const { users, loginSuccessful, loginError } = this.state;
    // if (loginSuccessful) alert('Bienvenue')
    return(
      <div style={styles.container}>
        <div style={styles.form} onKeyPress={(e) => {if (e.key === 'Enter') this.submit()}}>
          <select style={styles.select} name="username" value={this.state.username} onChange={this.onInputChange.bind(this)}>
            {this.state.users.map((user, key) => {
              return <option value={user.username}>{user.username}</option>
            })}
          </select>
          <input
            placeholder="Mot de passe..."
            type="password"
            name="password"
            value={this.state.password}
            style={styles.password}
            onChange={this.onInputChange.bind(this)}
          />
          {loginSuccessful === false && loginError != null && <p style={styles.loginError}>{loginError}</p>}
          <Button style={styles.button} type="submit" text="SE CONNECTER" action={this.submit.bind(this)}/>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#E1F5FE',
    background: "repeating-linear-gradient(45deg, #B3E5FC, #B3E5FC 5px, #E1F5FE 5px, #E1F5FE 10px)"
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '30%',
    fontSize: '2vw',
    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
    padding: '1em',
    borderRadius: '10px',
    background: 'white'
  },
  select: {
    appearance: 'none',
    fontSize: 'inherit',
    padding: '.5em 1em',
    marginBottom: '1em'
  },
  password: {
    fontSize: 'inherit',
    padding: '.5em 1em',
    marginBottom: '1em'
  },
  button: {
    padding: '.5em 1em'
  },
  loginError: {
    fontSize: '1.5vw',
    padding: '.5em',
    borderRadius: '10px',
    color: 'white',
    backgroundColor: '#F44336',
    margin: 0,
    marginBottom: '1em'
  }
}
