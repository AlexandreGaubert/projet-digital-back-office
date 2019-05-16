import React, { Component } from "react"

import Button from '../../../../../BackOffice/components/reusable/Button'
import './Item.css'
import { store } from '../../../../../redux/store'

export default class Item extends Component {
  state = {
    response: ''
  }
  constructor(props) {
    super(props)

    this.handleInput = this.handleInput.bind(this);
    this.submitResponse = this.submitResponse.bind(this);
  }
  handleInput(e) {
    this.setState({response: e.target.value});
  }
  submitResponse() {
    const { avis } = this.props;
    var updatedData = {
      ...avis,
      messages: [
        ...avis.messages,
         {from: 'resident', content: this.state.response}
      ],
      newMessageFromResident: avis.newMessageFromResident + 1
    }
    store.dispatch({type: 'EDIT_AVIS', data: updatedData})
    this.setState({response: ""});
  }
  componentDidMount() {
    const { avis } = this.props;
    console.log("reseting");
    store.dispatch({type: 'EDIT_AVIS', data: {...avis, newMessageFromFoyer: 0}})
  }
  render() {
    const { avis, closeAvis } = this.props;

    return(
      <div style={{position: 'relative'}}>
        <span style={{display: 'flex', margin: '1em', alignItems: 'center'}}>
          <i onClick={this.props.closeAvis} style={{float: 'left', fontSize: '3em'}} className="fas fa-arrow-left" />
          <h1 style={{margin: '1em auto'}}>Discussion avec l'équipe du foyer</h1>
        </span>

        <div style={styles.messageList}>
          {avis.messages.map((message, key) => {
            return (<Message message={message} index={key} key={key}/>)
          })}
        </div>
        <div style={{margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
          <div style={{width: '100%', overflow: 'hidden', boxSizing: 'border-box', textAlign: 'left', fontSize: '2vw', minHeight: '20vh', maxHeight: '100vh', position: 'relative', padding: '5px'}}>
            <textarea
              value={this.state.response}
              onChange={this.handleInput}
              placeholder="Votre réponse..."
              id="AvisTextarea"
              style={{ position: 'absolute', boxSizing: 'border-box', transition: 'all .2s ease-in-out', fontFamily: 'inherit', fontSize: 'inherit',top: 0, left: 0, right: 0, bottom: 0, width: '100%', padding: '5px'}}
            />
            {this.state.response}
          </div>
          <Button action={this.submitResponse} bgColor="rgb(0, 0, 255, .60)" style={{width: '100%', padding: '.5em 0', fontSize: '1.5vw', margin: '1em 0'}} text="ENVOYER"/>
        </div>
      </div>
    )
  }
}

const Message = (props) => {
  const { message } = props;
  const from = message.from;

  const style = {
    ...styles.message,
    marginLeft: from === 'foyer' ? 'auto' : 0,
    marginRight: from === 'foyer' ? 0 : 'auto',
    background: from === 'foyer' ? '#a9a6a6' : "#6666ff"
  }
  var className = "talk-bubble tri-right btm-" + (from === "foyer" ? "right" : "left") +"-in";
  return (
    <div style={style} className={className}>
      <div className="talktext">
        <p>{message.content}</p>
      </div>
    </div>
  )
}

const styles = {
  messageList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em'
  },
  message: {
    margin: '1em',
    color: 'white',
    fontSize: '2vw'
  },
  sendBtn: {
    width: '60%'
  },
  button: {
    fontSize: "3vw",
    position: 'absolute',
    top: 0,
    margin: '1em',
    cursor: 'pointer',
  }
}
