import React from 'react'
import PropTypes from 'prop-types'
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

import './Results.css'

class Results extends React.Component {
  download() {
    const { menu } = this.props;
    const from = new Date(menu.from);
    const to = new Date(menu.to);

    html2canvas(document.getElementById('printable-results'))
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`choix de menu du ${from.getDate()} ${window.months[from.getMonth()]} au ${to.getDate()} ${window.months[to.getMonth()]} ${to.getFullYear()}.pdf`);
    });
  }
  render () {
    const { menu, onClose } = this.props;
    console.log(menu);
    return (
      <div className="results-container">
        <div className="results-button-group">
          <i className="fas fa-times-circle print-button" onClick={onClose} style={{backgroundColor: 'rgb(255, 0, 0, .5)'}}/>
          <i className="fas fa-download print-button" onClick={this.download.bind(this)} style={{backgroundColor: 'rgb(0, 255, 0, .5)'}}/>
          <ReactToPrint
            trigger={() => <i className="fas fa-print print-button"/>}
            content={() => this.componentRef}
          />
        </div>
        <TableResults menu={menu} ref={el => (this.componentRef = el)}/>
      </div>
    )
  }
}

class TableResults extends React.Component {
  render() {
    const { menu } = this.props;
    const from = new Date(menu.from);
    const to = new Date(menu.to);

    return (
      <div id="printable-results" style={{margin: '0 auto', marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3>{`Liste des menus à faire semaine du ${from.getDate()} ${window.months[from.getMonth()]} au ${to.getDate()} ${window.months[to.getMonth()]} ${to.getFullYear()}`}</h3>
        <table style={{border: '1px solid black', margin: 'auto'}}  className="results-table">
          <tr>
            <th>Nom</th>
            <th>N° APT</th>
            <th>LUNDI</th>
            <th>MARDI</th>
            <th>MERCREDI</th>
            <th>JEUDI</th>
            <th>VENDREDI</th>
          </tr>
          {
            menu.results.map((result, key) => {
              return (
                <tr>
                  <td>{result.resident.lastname.toUpperCase() + ' ' + result.resident.firstname}</td>
                  <td>{result.resident.room}</td>
                  <td>{result.results[0]}</td>
                  <td>{result.results[1]}</td>
                  <td>{result.results[2]}</td>
                  <td>{result.results[3]}</td>
                  <td>{result.results[4]}</td>
                </tr>
              )
            })
          }
        </table>
      </div>

    )
  }
}

export default Results;
