import React, { Component } from "react"

import Slider from '../Slider/Slider'


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
        <Slider images={images} style={{maxWidth: '80%', maxHeight: '80%', zIndex: 10000}}/>
        <span onClick={onClose} style={styles.overlay}/>
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
