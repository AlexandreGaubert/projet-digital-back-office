import React, { Component } from "react"

export default class  extends Component {
  static defaultProps = {
    avis: []
  }
  render() {
    const { avis, sortBy, openAvis } = this.props;
    return(
      <table style={styles.table}>
        <th style={styles.headCell}>Non lu</th>
        <th style={styles.headCell} onClick={() => sortBy("resident")}>Résident</th>
        <th style={styles.headCell} onClick={() => sortBy('solved')}>Résolu</th>
        <th style={styles.headCell} onClick={() => sortBy('type')}>Type</th>
        <th style={styles.headCell} onClick={() => sortBy('date')}>Date</th>
        <tbody>
          {avis.map((item, key) => {
            var date = new Date(item.date)

            return (
              <tr onClick={() => openAvis(item._id)} style={{...styles.row, backgroundColor: item.type === 'positive' ? 'rgb(0, 255, 0, .80)' : 'rgb(255, 0, 0, .80)'}}>
                <td style={{display: 'flex', alignItems: 'center', height: 'inherit'}}>
                  <i className="fas fa-envelope" style={{display: 'flex', flexDirection: 'row', margin: 'auto', width: 'fit-content', alignItems: 'center'}}>
                    <p style={{margin: 0, marginLeft: '.5em', fontFamily: 'Montserrat'}}>{item.newMessageFromResident}</p>
                  </i>
                </td>
                <td>{`${item.resident.firstname} ${item.resident.lastname}`}</td>
                <td>{item.solved === true ? 'Oui' : 'Non'}</td>
                <td>{item.type === 'positive' ? 'Positif' : 'Négatif'}</td>
                <td>{`${window.days[date.getDay()]} ${date.getDate()} ${window.months[date.getMonth()]} ${date.getFullYear()}`}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

const styles = {
  table: {
    width: '100%',
    tableLayout: 'fixed',
    borderSpacing: 0,
    fontSize: '1.5vw',
  },
  row: {
    height: '3vw',
    cursor: 'pointer'
  },
  headCell: {
    cursor: 'pointer',
    padding: '1em 0'
  }
}
