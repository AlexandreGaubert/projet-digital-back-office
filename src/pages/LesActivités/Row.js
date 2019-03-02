import React, { Component } from "react"

export default class Row extends Component {

  state = {
    hover: false
  }
  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({hover: true});
  }

  onMouseLeave() {
    this.setState({hover: false});
  }

  render() {
    const { data, index, openModal } = this.props;
    const date = new Date(data.date)
    const { hover } = this.state;
    console.log(hover);
    return(
      <tr
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{...styles.row, backgroundColor: index % 2 == 0 ? '#ccc' : '#eaedf2'}}
      >
        <td>{data.name}</td>
        <td>{data.salle}</td>
        <td>{window.days[date.getDay()]}</td>
        <td style={{position: 'relative'}}>
          {`${data.beginAt} - ${data.endAt}`}
          {!hover ? null :
            <span style={styles.buttonGroup}>
              <span onClick={() => openModal("edit", data)} style={{...styles.button, backgroundColor: '#5188D8'}}><i className="fas fa-pencil-alt"/></span>
              <span onClick={() => openModal('delete', data)} style={{...styles.button, backgroundColor: '#BA3F1D'}}><i className="fas fa-trash"/></span>
            </span>
          }
        </td>
      </tr>
    )
  }
}

const styles = {
  row: {
    border: 'none',
    height: '2.5em',
    cursor: 'default',
    padding: '0 1em'
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
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
