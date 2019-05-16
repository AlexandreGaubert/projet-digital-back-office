import React from 'react'
import PropTypes from 'prop-types'

import './Employees.css'
import NavBar from '../../../components/NavBar/NavBar'
import { store } from '../../../../redux/store'

class ScreensInformationsEmployees extends React.Component {
  state = {
    employees: [],
    descriptions: []
  }
  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        employees: store.getState().employees.employees,
        descriptions: store.getState().employees.descriptions
      });
    })

    store.dispatch({type: 'GET_EMPLOYEE', data: null})
    store.dispatch({type: 'GET_SECTION_DESCRIPTION', data: null})
  }
  componentWillUnmount() {
    this.unsub();
  }
  render () {
    const { employees, descriptions } = this.state;

    return (
      <div id="ScreensInformationsEmployees">
        <NavBar
          title="Notre équipe"
          color="#ed8ba3"
        />
      <Section section="administration" descriptions={descriptions} label="L'équipe d'administration" employees={employees}/>
        <Section section="animation" descriptions={descriptions} label="Service Animation" employees={employees}/>
        <Section section="maintenance" descriptions={descriptions} label="Service de maintenance" employees={employees}/>
        <Section section="restauration" descriptions={descriptions} label="Notre équipe Restauration" employees={employees}/>
        <Section section="soin" descriptions={descriptions} label="Notre équipe de soin" employees={employees}/>
        <Section section="hotellerie" descriptions={descriptions} label="Notre équipe d'hôtellerie" employees={employees}/>
        <Section section="nuit" descriptions={descriptions} label="Notre équipe de nuit" employees={employees}/>
      </div>
    )
  }
}

const Section = props => {
  if (props.descriptions.length > 0)
    var description = props.descriptions.find(item => item.section === props.section).description
  else var description = ""
  return (
    <div style={styles.section}>
      <span style={styles.sectionLabel}>
        {props.label}
      </span>
      <span style={styles.sectionDescription}>
        {description}
      </span>
      <span style={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap'}}>
        {props.employees.map((employee, key) => {
          if (employee.section === props.section)
            return <Employee key={key} data={employee}/>
        })}
      </span>
    </div>
  )
}

const Employee = props => {
  const { data } = props;

  return (
    <div style={styles.listItem}>
      <img style={styles.employeePhoto} src={require('./user.png')}/>
      <p style={{margin: '0', fontSize: '4vw'}}>{data.firstname.slice(0, 1).toUpperCase() + data.firstname.slice(1)}</p>
      <p style={{margin: '0', fontSize: '4vw'}}>{data.lastname.toUpperCase()}</p>
      <p style={{fontWeight: 'bold', margin: '.3em 0', fontSize: '4vw'}}>{data.poste.slice(0, 1).toUpperCase() + data.poste.slice(1)}</p>
    </div>
  )
}

const styles = {
  listItem: {
    width: '32%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1em',
    position: 'relative',
  },
  employeePhoto: {
    width: '45%',
    marginBottom: '1em'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  sectionLabel: {
    width: '100%',
    fontSize: '8vw',
    margin: '1em 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionDescription: {
    padding: '0 1em 2em',
    textAlign: 'center',
    fontSize: '5vw'
  }
}

export default ScreensInformationsEmployees;
