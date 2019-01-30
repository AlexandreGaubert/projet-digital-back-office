import React, { Component } from "react"

import Gallerie from './Gallerie'
import Thumbnail from './Thumbnail'
import Form from './Form'
import { withCRUDLModal } from '../../hoc/withCRUDLModal'

class LaGallerie extends Component {
  static defaultProps = {

  }
  state = {
    images: [],
    gallery: null
  }
  constructor(props) {
    super(props)

  }
  openGallery(name) {
    var gallery = {name: name, images: []}
    var req = require.context("../../assets/images/galleries/gallery");
    req.keys().forEach(function(key){
      gallery.images.push(req(key))
    });
    this.setState({gallery: gallery});
  }
  closeGallery() {
    this.setState({gallery: null});
  }
  render() {
    const { children, openModal } = this.props;
    const { gallery } = this.state;
    return(
      <div style={styles.container}>
        {children}
        {gallery === null ?
          <List openModal={openModal} openGallery={this.openGallery.bind(this)}/>
          :
          <Gallerie goBack={this.closeGallery.bind(this)} data={gallery}/>
        }
      </div>
    )
  }
}

class List extends Component {
  render() {
    const { openModal, openGallery } = this.props;
    return (
      <div style={styles.list}>
        <i onClick={() => openModal('add')} className="fas fa-plus" style={styles.addBtn}/>
        <Thumbnail openGallery={openGallery} name="gallery0"/>
        <Thumbnail openGallery={openGallery} name="gallery1"/>
        <Thumbnail openGallery={openGallery} name="gallery2"/>
        <Thumbnail openGallery={openGallery} name="gallery3"/>
        <Thumbnail openGallery={openGallery} name="gallery4"/>
        <Thumbnail openGallery={openGallery} name="gallery5"/>
        <Thumbnail openGallery={openGallery} name="gallery6"/>
        <Thumbnail openGallery={openGallery} name="gallery7"/>
        <Thumbnail openGallery={openGallery} name="gallery8"/>
        <Thumbnail openGallery={openGallery} name="gallery9"/>
        <Thumbnail openGallery={openGallery} name="gallery10"/>
        <Thumbnail openGallery={openGallery} name="gallery11"/>
      </div>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    height: '100%'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative'
  },
  addBtn: {
    fontSize: '4vh',
    padding: '.5em',
    borderRadius: '100%',
    color: 'white',
    backgroundColor: '#2f383d',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
    margin: 'auto',
    cursor: 'pointer'
  },
}

export default withCRUDLModal(LaGallerie, Form)
