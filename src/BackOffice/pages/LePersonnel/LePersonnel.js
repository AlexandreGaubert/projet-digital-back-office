import React, { Component } from "react"

import { store } from '../../../redux/store'
import ListDesEmployees from './ListDesEmployees'
import FormEmployee from './FormEmployee'
import FormSectionDescription from './FormSectionDescription'
import Modal from '../../components/Modal'
import AddButton from '../../components/AddButton'
import DeletePopup from '../../components/DeletePopup'

export default class LesRésidents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: store.getState().employees.employees,
      descriptions: store.getState().employees.descriptions,
      nameInput: ''
    }

    this.openModal = this.openModal.bind(this);
    this.openDescriptionModal = this.openDescriptionModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {this.setState({employees: store.getState().employees.employees, descriptions: store.getState().employees.descriptions})})
    store.dispatch({type: 'GET_EMPLOYEE', data: null})
    store.dispatch({type: 'GET_SECTION_DESCRIPTION', data: null})
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  openModal(modal, employeeSelected) {
    this.setState({[modal + 'IsOpen'] : true, employeeSelected: employeeSelected});
  }
  openDescriptionModal(section, description) {
    this.setState({editSectionDescriptionOpen: true, descriptionSelected: description, sectionSelected: section});
  }
  closeModal(modal) {
    this.setState({[modal + 'IsOpen'] : false});
  }
  render() {
    const { employeeSelected, descriptionSelected, sectionSelected, employees, descriptions } = this.state;

    return(
      <div style={styles.container}>
        <span>
          <AddButton action={() => this.openModal('addEmployee')}/>
        </span>

        <ListDesEmployees openModal={this.openModal} openDescriptionModal={this.openDescriptionModal} employees={employees} descriptions={descriptions}/>

        <Modal isOpen={this.state.addEmployeeIsOpen} onClose={() => this.closeModal('addEmployee')}>
          <FormEmployee type={'create'}/>
        </Modal>
        <Modal isOpen={this.state.editEmployeeIsOpen} onClose={() => this.closeModal('editEmployee')}>
          <FormEmployee data={employeeSelected} type={'edit'}/>
        </Modal>
        <Modal isOpen={this.state.deleteEmployeeIsOpen} onClose={() => this.closeModal('deleteEmployee')}>
          <DeletePopup no={() => this.closeModal('deleteEmployee')} yes={() => {store.dispatch({type: 'DELETE_EMPLOYEE', data: employeeSelected }); this.closeModal('deleteEmployee')}}/>
        </Modal>
        <Modal isOpen={this.state.editSectionDescriptionOpen} onClose={() => this.setState({editSectionDescriptionOpen: false})}>
          <FormSectionDescription description={descriptionSelected} section={sectionSelected} onClose={() => this.setState({editSectionDescriptionOpen: false})}/>
        </Modal>
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  nameInput: {
    width: '80%',
    margin: '1em auto',
    fontSize: '2vw',
    padding: '.5em 1em'
  }
}
