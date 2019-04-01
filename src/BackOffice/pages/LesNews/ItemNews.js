import React, { Component } from "react"

import EditAndDeleteButtons from '../../components/EditAndDeleteButtons'
const colors = ["#0cce6b", "#38b6ff", "#dced31", '#ed8ba3', "#a6a6a6", "#ffbd59"]


export default class ItemNews extends Component {
  static defaultProps = {}
  state = {
    hover: false,
    bgColor: colors[Math.floor(Math.random() * Math.floor(6))]
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
    const date = new Date(data.date);
    const { hover } = this.state;
    data.body.replace(/\n/g, "<br />");
    return(
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{...styles.container, backgroundColor: data.color}}>
        <span style={styles.title}>
          {data.title}
        </span>
        <span style={styles.date}>
          {`${window.days[date.getDay()]} ${date.getDate()} ${window.months[date.getMonth()]}`}
        </span>
        {
          data.body && <span style={styles.body}>{data.body}</span>
        }
        {hover && <EditAndDeleteButtons edit={() => openModal('edit', data)} delete={() => openModal('delete', data)}/>}
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
    fontSize: '1.5vw',
    whiteSpace: 'pre-wrap'
  },
  date: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '.5em'
  },
}
