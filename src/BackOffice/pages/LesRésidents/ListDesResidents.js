import React, { Component } from "react"

export default class ListDesResidents extends Component {
  static defaultProps = {

  }
  state = {
  }
  render() {
    const { residents, openModal } = this.props;

    return(
      <div style={styles.list}>
        {residents.map((resident, key) => {
          return <Resident openModal={openModal} key={key} data={resident}/>
        })}
      </div>
    )
  }
}

class Resident extends Component {
  state = {
    hover: false
  }
  hoverIn() {
    this.setState({hover: true});
  }
  hoverOut() {
    this.setState({hover: false});
  }
  render() {
    const { data, openModal } = this.props;
    const { hover } = this.state;
    return (
      <div onMouseEnter={this.hoverIn.bind(this)} onMouseLeave={this.hoverOut.bind(this)} style={styles.listItem}>
        <img alt={`photo de ${data.gender} ${data.firstname} ${data.lastname}`} style={styles.residentPhoto} src={data.photo.length > 0 ? `http://localhost:8080/${data.photo}` : require('./user.png')}/>
        <p style={{fontWeight: 'bold', margin: '.3em 0'}}>{`${data.gender}. ${data.firstname} ${data.lastname.toUpperCase()}`}</p>
        <p style={{fontWeight: 'bold', margin: '.3em 0'}}>{`Chambre n°${data.room}`}</p>
        {!hover ? null :
          <span style={styles.buttonGroup}>
            <span onClick={() => openModal("editResident", data)} style={{...styles.button, backgroundColor: '#5188D8'}}><i className="fas fa-pencil-alt"/></span>
            <span onClick={() => openModal('deleteResident', data)} style={{...styles.button, backgroundColor: '#BA3F1D'}}><i className="fas fa-trash"/></span>
          </span>
        }
      </div>
    )
  }
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'auto'
  },
  listItem: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1em',
    position: 'relative'
  },
  residentPhoto: {
    width: '60%',
    marginBottom: '1em'
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 .2em',
    height: '30px',
    width: '30px',
    padding: '.2em',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    borderRadius: '100%',
    cursor: 'pointer'
  }
}
