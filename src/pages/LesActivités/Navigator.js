import React, { Component } from "react"


export default class Navigator extends Component {
  constructor(props) {
    super(props)
    var today = new Date();
    var monday = new Date();

    monday.setDate(today.getDate() - today.getDay() + 1)

    this.state = {
      monday: monday
    }
    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
  }

  prevWeek() {
    const { monday } = this.state;
    var prevMonday = monday;

    prevMonday.setDate(monday.getDate() - 7)
    this.setState(prevstate => {return {monday: prevMonday}});
  }

  nextWeek() {
    const { monday } = this.state;
    var nextMonday = monday;

    nextMonday.setDate(monday.getDate() + 7)
    this.setState(prevstate => {return {monday: nextMonday}});
  }
  render() {
    const { monday } = this.state;
    return(
      <span style={styles.nav}>
        <i style={{cursor: 'pointer'}} onClick={this.prevWeek} className="fas fa-chevron-left"/>
        {`Semaine du ${monday.getDate()} / ${monday.getMonth() < 9 ? "0" + (monday.getMonth() + 1) : monday.getMonth() + 1}`}
        <i style={{cursor: 'pointer'}} onClick={this.nextWeek} className="fas fa-chevron-right"/>
      </span>
    )
  }
}

const styles = {
  nav: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    margin: '0 auto',
    height: '2.6em',
    color: 'white',
    left: '50%',
    width: '50%',
    transform: "translate(-50%, 0)"
  },
}
