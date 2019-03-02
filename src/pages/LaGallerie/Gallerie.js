import React, { Component } from "react"

import './styles.css'
import FormAddImage from './FormAddImage';
import Diaporama from './Diaporama';
import Modal from '../../components/Modal'
import Button from '../../components/reusable/Button'
import DeletePopup from '../../components/DeletePopup'
import { withCRUDLModal } from '../../hoc/withCRUDLModal'
import { store } from '../../redux/store'

class Gallerie extends Component {
  state = {
    galleryOpen: false,
    addOpen: false,
    diapoOpen: false,
    deleteMode: false,
    imgsToDelete: []
  }
  constructor(props) {
    super(props)

    this.openAdd = this.openAdd.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.openDiapo = this.openDiapo.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.selectForDeletion = this.selectForDeletion.bind(this);
    this.deleteSelection = this.deleteSelection.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  openAdd() {
    this.setState({addOpen: true});
  }
  openDelete() {
    this.setState({deleteOpen: true});
  }
  openDiapo(index = 0) {
    this.setState({diapoOpen: true, index: index});
  }
  closeModal() {
    this.setState({addOpen:false, diapoOpen: false, deleteOpen: false});
  }
  toggleDeleteMode() {
    this.setState({deleteMode: true});
  }
  selectForDeletion(image) {
    var imgsToDelete = this.state.imgsToDelete;

    if (imgsToDelete.indexOf(image) > -1)
      imgsToDelete.splice(imgsToDelete.indexOf(image), 1);
    else
      imgsToDelete.push(image);

    this.setState({imgsToDelete: imgsToDelete});
  }
  deleteSelection() {
    const {imgsToDelete} = this.state
    var data = {};
    Object.assign(data, this.props.data);

    imgsToDelete.map((img, key) => {
      data.images.splice(data.images.indexOf(img), 1)
    })

    store.dispatch({type: 'EDIT_GALLERY', data: {update: data, deletedImages: imgsToDelete}})
    this.setState({imgsToDelete: [], deleteMode: false});
  }
  onMouseDown(e) {
    e.preventDefault()
    e.stopPropagation()
    this.mouseTimer = setTimeout(() => this.toggleDeleteMode(), 500)
  }
  onMouseUp() {
    clearTimeout(this.mouseTimer)
  }
  render() {
    const { openModal, goBack, data } = this.props;
    const { deleteMode } = this.state;

    return(
      <div style={styles.gallery}>
        <span style={styles.header}>
          <h1 style={{margin: '1em auto'}}>{data.name}</h1>
          <span style={styles.buttonGroup}>
            <i style={styles.button} onClick={this.openAdd} className='fas fa-plus'/>
            <i style={styles.button} onClick={this.openDiapo} className='fas fa-images'/>
            <i style={styles.button} onClick={goBack} className='fas fa-arrow-left'/>
          </span>
        </span>
        {deleteMode && <Button style={{width: '78%', margin: '0 auto', fontSize: '3vw', padding: '.5em 0'}} type="submit" text="TERMINER" action={this.deleteSelection}/>}
        <div style={styles.list}>
          {data.images.map((img, key) => {
            return (
              <Miniature
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown}
                onClick={deleteMode ? () => this.selectForDeletion(img) : () => this.openDiapo(key)}
                deleteMode={deleteMode}
                selectedForDeletion={this.state.imgsToDelete.indexOf(img) > -1}
                className={"gallerie-image"}
                src={require('./images/' + img)}
                key={key}
              />
            )
          })}
        </div>
        <Modal isOpen={this.state.addOpen} onClose={this.closeModal}>
          <FormAddImage id={data._id}/>
        </Modal>
        <Modal isOpen={this.state.deleteOpen} onClose={this.closeModal}>
          <DeletePopup no={this.closeModal}/>
        </Modal>
        {this.state.diapoOpen && <Diaporama images={data.images} index={this.state.index} onClose={this.closeModal}/> }

      </div>
    )
  }
}

const Miniature = props => {
  const { deleteMode, selectedForDeletion, onClick, style, src, onMouseDown, onMouseUp } = props;
  return (
    <div onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick} style={styles.miniature} className={"gallerie-image"}>
      <img
        height="100%"
        width="100%"
        src={src}
      />

      {deleteMode && <i style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: selectedForDeletion ? 'transparent' : 'rgb(255, 255, 255, .5)',
        zIndex: 10
      }}/>}

      {deleteMode && <span style={{
          position: 'absolute',
          top: 0,
          right: 0,
          margin: '1em',
          zIndex: 1000,
          height: '1em',
          width: '1em',
          border: '1px solid',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '3px'
        }}>
          {selectedForDeletion && <i className="fas fa-check" style={{}}/>}
        </span>
      }
    </div>
  )
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
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  miniature: {
    width: "24%",
    height: '30vh',
    margin: "1.5%",
    position: 'relative'
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
