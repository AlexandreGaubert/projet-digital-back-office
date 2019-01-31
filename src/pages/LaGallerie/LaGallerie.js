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
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{display: 'flex', margin: '1em 0 0 1em'}}>
              <i onClick={() => openModal('add')} className="fas fa-plus" style={styles.addBtn}/>
            </span>
            <List openModal={openModal} openGallery={this.openGallery.bind(this)}/>
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
    const { openGallery } = this.props;
    const galleries = [0, 1, 2, 3, 4, 5, 6]
    return (
      <div style={styles.list}>
        {
          galleries.map((gallery, key) => {
            const name = 'gallery' + key;
            return (
              <div style={styles.listSlot}>
                <Thumbnail delay={100 * key} openGallery={openGallery} name={name}/>
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
