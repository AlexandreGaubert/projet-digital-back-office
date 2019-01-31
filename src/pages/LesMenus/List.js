import React from 'react'

export default class List extends React.Component {
  render() {
    return (
      <div style={styles.list}>
        {this.props.menus.map((menu, key) => {
          return <ListItem data={menu} key={key}/>
        })}
      </div>
    )
  }
}

class ListItem extends React.Component {
  state = {
    expanded: false
  }
  toggleExpand() {
    this.setState(prevstate => {return {expanded: !prevstate.expanded}});
  }
  render() {
    const { data } = this.props;
    const from = new Date(data.from);
    const to = new Date(data.to)
    return (
      <div style={styles.item}>
        <div style={styles.head} onClick={this.toggleExpand.bind(this)}>
          {`Semaine du ${from.getDate()} ${window.months[from.getMonth()]} au ${to.getDate()} ${window.months[to.getMonth()]}`}
          <div style={styles.buttonGroup}>
            <i style={{...styles.button, backgroundColor: '#2f383d'}} className="fas fa-list"/>
            <i style={{...styles.button, backgroundColor: '#5188D8'}} className="fas fa-pencil-alt"/>
            <i style={{...styles.button, backgroundColor: '#BA3F1D'}} className="fas fa-trash"/>
          </div>
        </div>
        <ExpandedPanel expanded={this.state.expanded}/>
      </div>
    )
  }
}

class ExpandedPanel extends React.Component {
  render() {
    return(
      <div className="expandable-panel" style={{width: '100%', height: '40vh', backgroundColor: 'blue', maxHeight: this.props.expanded ? "100vh" : 0}}/>
    )
  }
}

const styles = {
  list: {
    display : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2em'
  },
  item: {
    width: '100%',
    transition: 'all .5s ease',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    marginBottom: '1em',
  },
  head: {
    fontSize: '2vw',
    display: 'flex',
    justifyContent: 'start',
    padding: '.5em',
    alignItems: 'center',
  },
  buttonGroup: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 .2em',
    height: '1.5vw',
    width: '1.5vw',
    padding: '.5em',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
    borderRadius: '100%',
    cursor: 'pointer',
    color: '#eaedf2'
  }
}
