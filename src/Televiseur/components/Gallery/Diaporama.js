import React, { Component } from "react"
import Slider from 'react-slick'

export default class Diaporama extends Component {
  static defaultProps = {
    index: 0
  }
  state = {
    index: this.props.index
  }
  constructor(props) {
    super(props)

    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }
  nextImage() {
    const { images } = this.props;

    this.setState(prevstate => {return {index: prevstate.index + 1 > images.length - 1 ? 0 : prevstate.index + 1}});
  }
  prevImage() {
    const { images } = this.props;

    this.setState(prevstate => {return {index: prevstate.index - 1 < 0 ? images.length - 1 : prevstate.index - 1}});
  }
  onKeyPress(e) {
    if (e.key === "ArrowLeft")
      this.prevImage()
    if (e.key === "ArrowRight")
      this.nextImage()
    if (e.key === 'Escape')
      this.props.onClose()
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress.bind(this))
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress.bind(this))
  }
  render() {
    const { index } = this.state;
    const { images, onClose } = this.props;
    const curImg = images[index]
    return(
      <div onKeyPress={(e) => this.onKeyPress(e)} style={styles.container}>
        <PrevArrow onClick={this.prevImage}/>
        <img style={styles.image} src={ "http://localhost:8080/" + curImg}/>
        <NextArrow onClick={this.nextImage}/>
        <i style={styles.overlay} onClick={this.onClose}/>
      </div>
    )
  }
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{...styles.arrow, right: '-35px'}}
    >
      <i style={{margin: 'auto'}} className={"fas fa-chevron-right"}/>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{...styles.arrow, left: '-35px'}}
    >
      <i style={{margin: 'auto'}} className={"fas fa-chevron-left"}/>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    color: 'white',
    overflow: 'hidden',
  },
  image: {
    maxHeight: '90vh',
    maxWidth: '90vw',
    zIndex: '1000',
    margin: 'auto'
  },
  arrow: {
    display: 'flex',
    zIndex: '1000',
    fontSize: '4vw',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
}
