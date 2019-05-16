import React from 'react'

import './ScreensInformationsTarifs.css'

class ScreensInformationsTarifs extends React.Component {
  componentDidMount() {
    axios.get('http://locahost:8080/getTarifs')
    .then(res => {
      this.setState({fetchingTarifs: false, tarifs: res.tarifs});
    })
    .catch(err => {
      this.setState({fetchingTarifs: false, tarifs: null});
    })
  }
  render () {
    return (
      <div id="ScreensInformationsTarifs">
        {fetchingTarifs && <h1>FETCHING...</h1>}
        {!fetchingTarifs && tarifs === null && <h1>La fiche tarifaire est indisponible pour le moment.</h1>}
        {!fetchingTarifs && tarifs !== null && <h1>FICHE RECU</h1>}
      </div>
    )
  }
}

export default ScreensInformationsTarifs;
