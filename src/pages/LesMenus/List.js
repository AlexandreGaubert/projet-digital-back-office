import React from 'react'

import Menu from './Menu'

export default class List extends React.Component {
  state = {
    menuID: null
  }
  openMenu(id) {
    this.setState({menuID: id})
  }
  closeMenu() {
    this.setState({menuID: null});
  }
  render() {
    const { menuID } = this.state;
    const { menus, openModal } = this.props;

    if (menuID != null) {
      const menu = menus.find(menu => {return menu._id === menuID});
      return <Menu closeMenu={this.closeMenu.bind(this)} data={menu}/>
    }

    return (
      <div style={{padding: '1em'}}>
        <span style={styles.addBtnWrapper}>
          <i onClick={() => this.props.openModal('add')} className="fas fa-plus" style={styles.addBtn}/>
        </span>
        <div style={styles.list}>
          {menus.map((menu, key) => {
            return <ListItem openModal={openModal} openMenu={this.openMenu.bind(this)} data={menu} key={key}/>
          })}
        </div>
      </div>
    )
  }
}

class ListItem extends React.Component {
  state = {
    hover: false
  }
  onMouseEnter() {
    this.setState({hover: true});
  }
  onMouseLeave() {
    this.setState({hover: false});
  }
  render() {
    const { data, openMenu, openModal } = this.props;
    const { hover } = this.state;
    const from = new Date(data.from);
    const to = new Date(data.to)

    return (
      <div onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} style={styles.item}>
        <div style={styles.head} onClick={() => openMenu(data._id)}>
          {`Semaine du ${from.getDate()} ${window.months[from.getMonth()]} au ${to.getDate()} ${window.months[to.getMonth()]}`}
        </div>
        {!hover ? null :
          <span style={styles.buttonGroup}>
            <span onClick={() => openModal("edit", data)} style={{...styles.button, backgroundColor: '#5188D8'}}><i className="fas fa-pencil-alt"/></span>
            <span onClick={() => openModal("delete", data)} style={{...styles.button, backgroundColor: '#BA3F1D'}}><i className="fas fa-trash"/></span>
          </span>
        }
      </div>
    )
  }
}

const styles = {
  list: {
    display : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    transition: 'all .5s ease',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    marginBottom: '1em',
    position: 'relative'
  },
  head: {
    fontSize: '2vw',
    display: 'flex',
    justifyContent: 'start',
    padding: '.5em',
    alignItems: 'center',
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto 0'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto .2em',
    height: '2vw',
    width: '2vw',
    padding: '.3em',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    borderRadius: '100%',
    cursor: 'pointer',
    fontSize: '2vw'
  },
  addBtnWrapper: {
    display: 'flex',
    cursor: 'pointer',
    fontSize: '2vw',
    marginRight: 'auto',
    width: 'max-content',
    marginBottom: '1em'
  },
  addBtn: {
    padding: '.5em',
    borderRadius: '100%',
    color: 'white',
    backgroundColor: '#2f383d',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)',
  },
}
