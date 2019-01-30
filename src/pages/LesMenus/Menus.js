import React from 'react';

import Button from '../../components/reusable/Button'

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']

export default class Menus extends React.Component {
  state = {
    plat_1: '',
    plat_2: '',
    plat_3: '',
    entree_1: '',
    entree_2: '',
    day: 0
  }
  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  nextDay() {
    this.setState(prevstate => {return {day: prevstate.day === 4 ? 0 : prevstate.day + 1}});
  }
  prevDay() {
    this.setState(prevstate => {return {day: prevstate.day === 0 ? 4 : prevstate.day - 1}});
  }
  render() {
    const { plat_1, plat_2, plat_3, entree_1, entree_2, day } = this.state;
    return (
      <div style={styles.container}>
        <span style={styles.nav}>
          <i style={{cursor: 'pointer'}} onClick={this.prevDay.bind(this)} className="fas fa-chevron-left"/>
          {days[day]}
          <i style={{cursor: 'pointer'}} onClick={this.nextDay.bind(this)} className="fas fa-chevron-right"/>
        </span>
        <span style={styles.plats}>
          <input placeholder="Plat N°1" style={styles.platInput} onChange={this.handleInputChange.bind(this)} name={"plat_1"} value={plat_1}/>
          <input placeholder="Plat N°2" style={styles.platInput} onChange={this.handleInputChange.bind(this)} name={"plat_2"} value={plat_2}/>
          <input placeholder="Plat N°3" style={styles.platInput} onChange={this.handleInputChange.bind(this)} name={"plat_3"} value={plat_3}/>
        </span>
        <span style={styles.entrees}>
          <input placeholder="Entrée N°1" style={styles.entreeInput} onChange={this.handleInputChange.bind(this)} name={"entree_1"} value={entree_1}/>
          <input placeholder="Entrée N°2" style={styles.entreeInput} onChange={this.handleInputChange.bind(this)} name={"entree_2"} value={entree_2}/>
        </span>
        <Button type="submit" text="VALIDER" style={styles.button}/>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    margin: '0 auto',
    fontSize: '1.7vw'
  },
  nav: {
    display: 'flex',
    alignItems: 'baseline',
    margin: '0 auto',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '1em',
    fontSize: '3vw'
  },
  plats: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontSize: '2.5vw'
  },
  platInput: {
    padding: '.5em',
    margin: '.5em 0',
    fontSize: '2.5vw'

  },
  entrees: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',

  },
  entreeInput: {
    padding: '.5em',
    margin: '1em 0',
    width: '40%',
    fontSize: '2vw'

  },
  button: {
    padding: '2vh 0',
    margin: '.5em 0',
    width: '100%',
    fontSize: '2.5vw'
  }
}
