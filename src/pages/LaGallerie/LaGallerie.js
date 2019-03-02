import React, { Component } from "react"

import Gallerie from './Gallerie'
import Thumbnail from './Thumbnail'
import Form from './Form'
import { withCRUDLModal } from '../../hoc/withCRUDLModal'
import { store } from '../../redux/store'

class LaGallerie extends Component {
  static defaultProps = {

  }
  state = {
    images: [],
    galleries: store.getState().galleries.galleries,
    gallery: null
  }
  constructor(props) {
    super(props)

  }
  openGallery(id) {
    const gallery = this.state.galleries.find(item => item._id === id);
    console.log(gallery);
    this.setState({gallery: gallery});
  }
  closeGallery() {
    this.setState({gallery: null});
  }
  componentDidMount() {
    store.subscribe(() => {this.setState({galleries: store.getState().galleries.galleries})})
    store.dispatch({type: 'GET_GALLERY'})
  }
  render() {
    const { children, openModal } = this.props;
    const { galleries, gallery } = this.state;
    console.log(galleries);
    return(
      <div style={styles.container}>
        {children}
        {gallery === null ?
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{display: 'flex', margin: '1em 0 0 1em'}}>
              <i onClick={() => openModal('add')} className="fas fa-plus" style={styles.addBtn}/>
            </span>
            <List galleries={galleries} openModal={openModal} openGallery={this.openGallery.bind(this)}/>
          </div>
          :
          <Gallerie goBack={this.closeGallery.bind(this)} data={gallery}/>
        }
      </div>
    )
  }
}

class List extends Component {
  render() {
    const { openGallery, galleries } = this.props;
    return (
      <div style={styles.list}>
        {
          galleries.map((gallery, key) => {
            const name = 'gallery' + key;
            return (
              <div style={styles.listSlot}>
                <Thumbnail delay={100 * key} openGallery={openGallery} name={gallery.name} id={gallery._id} image={gallery.images[0]}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  listSlot: {
    width: '33.33333333333333%',
    height: "35vh",
    display: 'flex',
    marginTop: '1.5em',
    position: 'relative',
  },
  addBtn: {
    fontSize: '4vh',
    padding: '.5em',
    borderRadius: '100%',
    color: 'white',
    backgroundColor: '#2f383d',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
    cursor: 'pointer'
  },
}

export default withCRUDLModal(LaGallerie, Form)
