import React, { Component } from "react"

export default class MenuDay extends Component {
  render() {
    const { data, day } = this.props;
    console.log(data);
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>{window.days[day]}</h2>
        <table style={styles.table}>
          <tbody>
            <tr style={styles.head}>
              <th style={styles.headCell}></th>
              <th style={styles.headCell}></th>
              <th style={styles.headCell}></th>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Entrée n°1</td>
              <td style={styles.plat}>{data.entree_1}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Entrée n°2</td>
              <td style={styles.plat}>{data.entree_2}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Plat n°1</td>
              <td style={styles.plat}>{data.plat_1}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Plat n°2</td>
              <td style={styles.plat}>{data.plat_2}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Plat n°3</td>
              <td style={styles.plat}>{data.plat_3}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Légumes</td>
              <td style={styles.plat}>{data.legumes}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Plateau_1</td>
              <td style={styles.plat}>{data.plateau_1}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.label}>Plateau_2</td>
              <td style={styles.plat}>{data.plateau_2}</td>
              <td>
                <i style={{color: '#2f383d'}} className="fas fa-upload"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5% 10%'
  },
  table: {
    width: '100%'
  },
  row: {
    height: '6vh',
    border: '1px solid'
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
  plat: {
    textAlign: 'left'
  }
}
