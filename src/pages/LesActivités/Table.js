import React, { Component } from "react"

import Navigator from './Navigator';
import Row from './Row';

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export default class Table extends Component {
  render() {
    const { animations, openModal } = this.props;
    return (
      <table style={styles.table}>
        <Navigator/>
        <Head openModal={openModal}/>
        {animations.map((animation, key) => {
          return (
            <Row openModal={openModal} data={animation} index={key}/>
          )
        })}
      </table>

    )
  }
}

const Head = (props) => {
  return (
    <tr style={styles.tableHead}>
      <th></th>
      <th></th>
      <th style={styles.addBtnWrapper}>
        <i onClick={() => props.openModal('add')} className="fas fa-plus" style={styles.addBtn}/>
      </th>
    </tr>
  )
}



const styles = {
  table: {
    position: 'relative',
    width: '100%',
    fontSize: '1.5em',
    borderRadius: '30px 30px 0 0',
    borderSpacing: 0,
    backgroundColor: '#1f282d',
    border: '1px solid #2f383d'
  },
  tableHead: {
    height: '2em'
  },
  addBtnWrapper: {
    display: 'flex',
    cursor: 'pointer'
  },
  addBtn: {
    padding: '.5em',
    borderRadius: '100%',
    color: 'white',
    backgroundColor: '#2f383d',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
    margin: '.3em',
    marginLeft: 'auto',
  }
}
