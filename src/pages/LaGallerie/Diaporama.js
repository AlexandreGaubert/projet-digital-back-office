import React, { Component } from "react"
import Slider from 'react-slick'

import './Diaporama.css'

export default class Diaporama extends Component {
  static defaultProps = {

  }
  state = {
    index: 0
  }
  constructor(props) {
    super(props)
    this.nextImage = this.nextImage.bind(this);
  }
  nextImage() {
    this.setState(prevstate => {return {index: prevstate.index + 1 > this.props.images.length - 1 ? 0 : prevstate.index + 1}});
  }
  render() {
    const { index } = this.state;
    const { images, isOpen, onClose } = this.props;
    const settings = {
      accessibility: true,
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
    };
    console.log(isOpen);
    return(
      <div style={{...styles.container, display: isOpen ? 'flex' : 'none'}}>
        <div onClick={onClose} style={styles.overlay}/>
        <div style={styles.diaporama}>
          <Slider {...settings}>
            {images.map((image, key) => {
              return <img src={image} key={key}/>
            })}
          </Slider>
        </div>
      </div>
    )
  }
}

function NextArrow(props) {
  const { className, style, onClick } = props;
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
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{...styles.arrow, left: '-35px'}}
    >
      <i style={{margin: 'auto'}} className={"fas fa-chevron-left"}/>
    </div>
  );
}

const winWidth = document.body.clientWidth
const winHeight = document.body.clientHeight

const styles = {
  container: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    color: 'white'
  },
  diaporama: {
    margin: 'auto',
    width: '90%',
    maxHeight: '90vh',
    zIndex: 20000
  },
  image: {
    width: '100%',
    height: '100%'
  },
  arrow: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
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
