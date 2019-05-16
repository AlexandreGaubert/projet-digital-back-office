import React, { Component } from "react"

export default class ListDesEmployees extends Component {
  render() {
    const { employees, descriptions, openModal, openDescriptionModal } = this.props;

    return(
      <div style={styles.list}>
        <EmployeesSection section="administration" employees={employees} descriptions={descriptions} openModal={openModal} openDescriptionModal={openDescriptionModal}/>
        <EmployeesSection section="animation" employees={employees} descriptions={descriptions} openModal={openModal} openDescriptionModal={openDescriptionModal}/>
        <EmployeesSection section="maintenance" employees={employees} descriptions={descriptions} openModal={openModal} openDescriptionModal={openDescriptionModal}/>
        <EmployeesSection section="restauration" employees={employees} descriptions={descriptions} openModal={openModal} openDescriptionModal={openDescriptionModal}/>
        <EmployeesSection section="soin" employees={employees} descriptions={descriptions} openModal={openModal} openDescriptionModal={openDescriptionModal}/>
        <EmployeesSection section="hotellerie" employees={employees} descriptions={descriptions} openModal={openModal} openDescriptionModal={openDescriptionModal}/>
        <EmployeesSection section="nuit" employees={employees} descriptions={descriptions} openModal={openModal} openDescriptionModal={openDescriptionModal}/>
      </div>
    )
  }
}

class EmployeesSection extends Component {
  render() {
    const { section, employees, openModal, openDescriptionModal, descriptions } = this.props;
    return(
      <div style={styles.section}>
        <span style={styles.sectionLabel}>
          <i style={{width: '20%', border: '1px solid'}}/>
          <span style={{margin: '0 1em'}}>{section.toUpperCase()}</span>
          <i style={{width: '20%', border: '1px solid'}}/>
        </span>
        <SectionDescription section={section} description={descriptions.find(desc => desc.section === section).description} openDescriptionModal={openDescriptionModal}/>
        <span style={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-end'}}>
          {employees.map((employee, key) => {
            if (employee.section === section)
              return <Employee openModal={openModal} key={key} data={employee}/>
          })}
        </span>
      </div>
    )
  }
}

class SectionDescription extends Component {
  state = {
    hover: false
  }
  hoverIn() {
    this.setState({hover: true});
  }
  hoverOut() {
    this.setState({hover: false});
  }
  render() {
    const { description, section, openDescriptionModal } = this.props;
    const { hover } = this.state;

    return (
      <div onMouseEnter={this.hoverIn.bind(this)} onMouseLeave={this.hoverOut.bind(this)} style={styles.sectionDescription}>
        {description}
        {!hover ? null :
          <span style={styles.buttonGroup}>
            <span onClick={() => openDescriptionModal(section, description)} style={{...styles.button, backgroundColor: '#5188D8'}}><i className="fas fa-pencil-alt"/></span>
          </span>
        }
      </div>
    )
  }
}

class Employee extends Component {
  state = {
    hover: false
  }
  hoverIn() {
    this.setState({hover: true});
  }
  hoverOut() {
    this.setState({hover: false});
  }
  render() {
    const { data, openModal } = this.props;
    const { hover } = this.state;

    return (
      <div onMouseEnter={this.hoverIn.bind(this)} onMouseLeave={this.hoverOut.bind(this)} style={styles.listItem}>
        <img style={styles.employeePhoto} src={data.photo.length > 0 ? `http://localhost:8080/${data.photo}` : require('./user.png')}/>
        <p style={{fontWeight: 'bold', margin: '.3em 0'}}>{data.firstname.slice(0, 1).toUpperCase() + data.firstname.slice(1)}</p>
        <p style={{fontWeight: 'bold', margin: '.3em 0'}}>{data.lastname.toUpperCase()}</p>
        <p style={{fontWeight: 'bold', margin: '.3em 0'}}>{data.poste.slice(0, 1).toUpperCase() + data.poste.slice(1)}</p>
        {!hover ? null :
          <span style={styles.buttonGroup}>
            <span onClick={() => openModal("editEmployee", data)} style={{...styles.button, backgroundColor: '#5188D8'}}><i className="fas fa-pencil-alt"/></span>
            <span onClick={() => openModal('deleteEmployee', data)} style={{...styles.button, backgroundColor: '#BA3F1D'}}><i className="fas fa-trash"/></span>
          </span>
        }
      </div>
    )
  }
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginTop: '10vh',
  },
  listItem: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1em',
    position: 'relative'
  },
  employeePhoto: {
    width: '40%',
    marginBottom: '1em'
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 .2em',
    height: '30px',
    width: '30px',
    padding: '.2em',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    borderRadius: '100%',
    cursor: 'pointer',
    color: 'white',
    transform: 'scale(1.1)'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  sectionLabel: {
    width: '100%',
    fontSize: '2vw',
    margin: '1em 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionDescription: {
    padding: '0 1em 2em',
    textAlign: 'justify',
    position: 'relative'
  }
}
