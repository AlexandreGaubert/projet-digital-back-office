import React, { Component } from "react"

export default class ItemNews extends Component {
  static defaultProps = {

  }
  state = {
    hover: false
  }
  constructor(props) {
    super(props)

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
    const { data, openModal } = this.props;
    const { hover } = this.state;
    return(
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{...styles.container, backgroundColor: this.props.bgColor}}>
        <span style={styles.title}>
          {data.title}
        </span>
        <span style={styles.date}>
          {`${window.days[data.date.getDay()]} ${data.date.getDate()} ${window.months[data.date.getMonth()]}`}
        </span>
        {
          data.body && <span style={styles.body}>{data.body}</span>
        }
        {!hover ? null :
          <span style={styles.buttonGroup}>
            <span onClick={() => openModal("edit", data)} style={{...styles.button, backgroundColor: '#5188D8'}}><i className="fas fa-pencil-alt"/></span>
            <span onClick={() => openModal("delete")} style={{...styles.button, backgroundColor: '#BA3F1D'}}><i className="fas fa-trash"/></span>
          </span>
        }
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    backgroundColor: 'blue',
    margin: '1em 0',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.75)',
    borderRadius: '10px',
    cursor: 'default',
    flexDirection: 'column',
  },
  title: {
    margin: 'auto',
    marginTop: '1em',
    fontSize: '3vw'
  },
  body: {
    textAlign: 'left',
    margin: '1.5em',
    fontWeight: 'bold',
    fontSize: '1.5vw'
  },
  date: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '.5em'
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    marginTop: '1em'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 .2em',
    height: '35px',
    width: '35px',
    padding: '.2em',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    borderRadius: '100%',
    cursor: 'pointer',
    fontSize: '25px'
  }
}
