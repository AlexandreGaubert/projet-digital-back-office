import React from 'react'
import PropTypes from 'prop-types'

import { store } from '../../../redux/store'
import NewsList from '../../components/News/List.js'
import ScreenTitle from '../../components/reusable/ScreenTitle.js'
import "./News.css"

class ScreensNews extends React.Component {
  state = {
    news: []
  }
  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState({news: store.getState().news.news});
    })
    store.dispatch({type: 'GET_NEWS', data: null})
  }
  render () {
    const { news } = this.state;
    return (
      <div id="ScreensNews">
        <ScreenTitle title="les nouvelles de la résidence" icon="newspaper" bgColor="#ec368d"/>
        <NewsList news={news}/>
      </div>
    )
  }
}

export default ScreensNews;
