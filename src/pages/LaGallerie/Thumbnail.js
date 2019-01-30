import React, { Component } from "react"

import { withHover } from '../../hoc/withHover'

class Gallerie extends Component {
  static defaultProps = {

  }
  state = {
    images: [],
    galleryOpen: false
  }
  constructor(props) {
    super(props)

  }
  render() {
    const { images, galleryOpen } = this.state;
    const { hover, name, openGallery } = this.props;
    return(
      <div {...this.props} onClick={() => openGallery(name)} style={styles.thumbnail}>
        <img style={styles.thumbnailImage} src={require("../../assets/images/galleries/gallery/thumbnail.png")}/>
        <span style={{...styles.overlay, backgroundColor: hover ? 'rgb(0,0,0,.75)' : 'rgb(0,0,0,.50)'}}>
          <p style={{padding: '1em'}}>{name.toUpperCase()}</p>
        </span>
      </div>
    )
  }
}

const styles = {
  thumbnail: {
    width: '33.33333333333333%',
    display: 'flex',
    marginTop: '1.5em',
    position: 'relative',
  },
  thumbnailImage: {
    width: '90%',
    height: '100%',
    margin: 'auto',
    cursor: 'pointer'

  },
  overlay: {
    width: '90%',
    height: '100%',
    top: 0,
    right: 0,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2vw',
    fontWeight: 'bold',
    transition: 'background-color .5s ease'
  },
}

export default withHover(Gallerie)
