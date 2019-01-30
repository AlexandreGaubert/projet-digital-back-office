import React, { Component } from "react"

import FormAddImage from './FormAddImage';
import Diaporama from './Diaporama';
import Modal from '../../components/Modal'
import { withCRUDLModal } from '../../hoc/withCRUDLModal'

class Gallerie extends Component {
  static defaultProps = {

  }
  state = {
    images: [],
    galleryOpen: false,
    addOpen: false,
    diapoOpen: false
  }
  constructor(props) {
    super(props)

    this.openAdd = this.openAdd.bind(this);
    this.openDiapo = this.openDiapo.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openAdd() {
    this.setState({addOpen: true});
  }
  openDiapo() {
    this.setState({diapoOpen: true});
  }
  closeModal() {
    this.setState({addOpen:false, diapoOpen: false});
  }
  render() {
    const { images, name } = this.props.data;
    const { children, openModal, goBack } = this.props;
    return(
      <div style={styles.gallery}>
        {children}
        <span style={styles.header}>
          <h1 style={{margin: 'auto'}}>{name}</h1>
          <span style={styles.buttonGroup}>
            <i style={styles.button} onClick={this.openAdd} className='fas fa-plus'/>
            <i style={styles.button} onClick={this.openDiapo} className='fas fa-images'/>
            <i style={styles.button} onClick={goBack} className='fas fa-arrow-left'/>
          </span>
        </span>
        <div style={styles.list}>
          {images.map((img, key) => {
            return <img style={styles.image} src={img} key={key}/>
          })}
        </div>
        <Modal isOpen={this.state.addOpen} onClose={this.closeModal}>
          <FormAddImage/>
        </Modal>
        <Diaporama images={images} isOpen={this.state.diapoOpen} onClose={this.closeModal}/>
      </div>
    )
  }
}

const styles = {
  gallery: {
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative'
  },
  buttonGroup: {
    marginLeft: 'auto',
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
    fontSize: '2.5vw',
    backgroundColor: '#2f383d',
    padding: '.5em',
    borderRadius: '100%',
    width: '3vw',
    height: '3vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px 0px rgb(0, 0, 0)'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: "24%",
    height: '100%',
    margin: "1em"
  },
  buttonDiapo: {
    fontSize: '3vw',
    backgroundColor: 'green',
    padding: '1em',
    width: '60%',
    color: 'white'
  }
}

export default Gallerie
