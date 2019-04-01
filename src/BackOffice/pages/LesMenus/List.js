import React from 'react'

import Menu from './Menu'
import EditAndDeleteButtons from '../../components/EditAndDeleteButtons'
import AddButton from '../../components/AddButton'

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
    menus.sort((a, b) => new Date(b.from) - new Date(a.from))

    return (
      <div style={{padding: '1em', position: 'relative'}}>
        <AddButton action={() => this.props.openModal('add')}/>
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
          {`${from.getDate()} ${window.months[from.getMonth()]} au ${to.getDate()} ${window.months[to.getMonth()]}`}
        </div>
        {hover && <EditAndDeleteButtons edit={() => openModal("edit", data)} delete={() => openModal("delete", data)}/>}
      </div>
    )
  }
}

const styles = {
  list: {
    display : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    marginTop: '4em'
  },
  item: {
    width: '100%',
    transition: 'all .5s ease',
    position: 'relative',
    borderBottom: '2px solid #ccc'
  },
  head: {
    fontSize: '2vw',
    display: 'flex',
    justifyContent: 'start',
    padding: '.5em',
    alignItems: 'center',
  }
}
