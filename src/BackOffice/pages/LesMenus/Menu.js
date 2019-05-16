import React from 'react'

import MenuDay from './MenuDay'
import Results from './Results'
import Form from './Form'
import Modal from '../../components/Modal'

export default class Menu extends React.Component {
  state = {
    editOpen: false
  }
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal(modal) {
    this.setState({[modal + 'Open']: true});
  }
  closeModal(modal) {
    this.setState({[modal + 'Open'] : false});
  }
  render() {
    const { data } = this.props;
    const { editOpen, listOpen } = this.state;
    const from = new Date(data.from);
    const to = new Date(data.to)
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>{`Semaine du ${from.getDate()} ${window.months[from.getMonth()]} au ${to.getDate()} ${window.months[to.getMonth()]}`}</h1>
          <div style={styles.buttonGroup}>
            <i onClick={() => this.openModal('list')} style={{...styles.button, backgroundColor: '#2f383d'}} className="fas fa-list"/>
            <i onClick={() => this.openModal('edit')} style={{...styles.button, backgroundColor: '#5188D8'}} className="fas fa-pencil-alt"/>
            <i style={{...styles.button, backgroundColor: '#BA3F1D'}} className="fas fa-trash"/>
            <i onClick={this.props.closeMenu} style={{...styles.button, backgroundColor: '#2f383d'}} className="fas fa-arrow-left"/>
          </div>
          <MenuDay day={1} data={data.lundi}/>
          <MenuDay day={2} data={data.mardi}/>
          <MenuDay day={3} data={data.mercredi}/>
          <MenuDay day={4} data={data.jeudi}/>
          <MenuDay day={5} data={data.vendredi}/>
        </div>
        <Modal isOpen={editOpen} onClose={() => this.closeModal('edit')}>
          <Form type="edit" data={data}/>
        </Modal>
        <Modal isOpen={listOpen} onClose={() => this.closeModal('list')}>
          <Results menu={data}/>
        </Modal>
      </div>
    )
  }
}

const styles = {
  header: {
    position: 'relative'
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    marginLeft: '.5em',
  },
  button: {
    marginTop: '.5em',
    fontSize: '2vw',
    backgroundColor: '#2f383d',
    padding: '.5em',
    borderRadius: '100%',
    width: '2vw',
    height: '2vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px 0px rgb(0, 0, 0)',
  },
}
