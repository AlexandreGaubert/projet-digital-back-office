import React, { Component } from "react"

import { withHover } from '../../hoc/withHover'
import './Thumbnail.css'

class Gallerie extends Component {
  static defaultProps = {

  }
  state = {
    galleryOpen: false,
    isShow: false
  }
  constructor(props) {
    super(props)

  }
  componentWillMount() {
    var that = this;
    setTimeout(function() {
      that.setState({isShow: true});
    }, this.props.delay)
  }
  render() {
    if (this.state.isShow === false) return null;

    const { galleryOpen } = this.state;
    const { hover, name, id, openGallery, image } = this.props;
    return(
      <div className="thumbnail" {...this.props} onClick={() => openGallery(id)} style={styles.thumbnail}>
        <img style={styles.thumbnailImage} src={require('./images/' + image)}/>
        <span style={{...styles.overlay, backgroundColor: hover ? 'rgb(0,0,0,.75)' : 'rgb(0,0,0,.50)'}}>
          <p style={{padding: '1em'}}>{name.toUpperCase()}</p>
        </span>
      </div>
    )
  }
}

const styles = {
  thumbnail: {
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
