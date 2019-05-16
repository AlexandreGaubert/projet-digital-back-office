import React from 'react'
import PropTypes from 'prop-types'

import './List.css'

class NewsList extends React.Component {
  render () {
    const { news } = this.props;
    news.sort((a, b) => new Date(b.date) - new Date(a.date))
    return (
      <div id="NewsList">
        {news.map((item, key) => {
          return <News data={item}/>
        })}
      </div>
    )
  }
}

class News extends React.Component {
  static defaultProps = {}
  state = {}

  render() {
    const { data } = this.props;
    const date = new Date(data.date);
    data.body.replace(/\n/g, "<br />");

    return(
      <div className="NewsList-item" style={{backgroundColor: data.color}}>
        <span className="NewsList-item-title">
          {data.title}
        </span>
        <span className="NewsList-item-date">
          {`${window.days[date.getDay()]} ${date.getDate()} ${window.months[date.getMonth()]}`}
        </span>
        {data.body && <span className="NewsList-item-body">{data.body}</span>}
      </div>
    )
  }
}

export default NewsList;
