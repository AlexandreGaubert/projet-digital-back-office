import React, { Component } from "react"

import Gallerie from '../../components/Gallery/Gallery'
import Thumbnail from '../../components/Gallery/Thumbnail'
import ScreenTitle from '../../components/reusable/ScreenTitle'
import { store } from '../../../redux/store'

class ScreensGallery extends Component {
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
    const { galleries, gallery } = this.state;
    return(
      <div style={styles.container}>
        <ScreenTitle bgColor="#9975ba" icon="camera-retro" title="la galerie des évènements"/>
        {gallery === null ?
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <List galleries={galleries} openGallery={this.openGallery.bind(this)}/>
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
                <Thumbnail delay={100 * key} openGallery={openGallery} name={gallery.name} id={gallery._id} image={gallery.images.length > 0 ? gallery.images[0] : null}/>
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
    position: 'relative'
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
}

export default ScreensGallery
