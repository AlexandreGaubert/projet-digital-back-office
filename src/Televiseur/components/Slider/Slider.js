import React from 'react'
import PropTypes from 'prop-types'
import Slick from 'react-slick'

import './Slider.css'

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { images, dots } = this.props;

    const settings = {
      dots: typeof(dots) != "undefined" ? dots : true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      prevArrow: <PrevArrow/>,
      nextArrow: <NextArrow/>,
      autoplay: true,
    };
    return (
      <div className="Slider" style={{...this.props.style}}>
        <Slick {...settings} ref={this.slider}>
          {images.map(image => <img className="Slider-image" src={'http://localhost:8080/' + image}/>)}
        </Slick>
      </div>
    );
  }
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div type="button" onClick={onClick} className="slider-arrow arrow-next" aria-label={"next"}>
      <i className="fas fa-chevron-right" />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div type="button" onClick={onClick} className="slider-arrow arrow-prev" aria-label={"prev"}>
      <i className="fas fa-chevron-left" />
    </div>
  );
}
