import React, { Component } from "react"

import Button from '../../components/reusable/Button'
import './styles.css'
import { store } from '../../../redux/store'

export default class AvisOpen extends Component {
  static defaultProps = {

  }
  state = {

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
         {from: 'foyer', content: this.state.response}
      ]
    }
    store.dispatch({type: 'EDIT_AVIS', data: updatedData})
  }
  render() {
    const { avis } = this.props;
    console.log(avis.solved);
    return(
      <div style={{position: 'relative'}}>
        <i onClick={this.props.back} style={{...styles.button, left: 0}} className="fas fa-arrow-left" />
        <h1 style={{margin: '1em'}}>Discussion avec {avis.resident}</h1>
        <i onClick={this.props.toggleSolve} style={{...styles.button, right: 0, color: avis.solved ? 'green' : 'black'}} className="fas fa-check" />

        <div style={styles.messageList}>
          {avis.messages.map((message, key) => {
            return (<Message message={message} key={key}/>)
          })}
        </div>
        <div style={{margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
          <textarea
            value={this.state.response}
            onChange={this.handleInput}
            placeholder="Votre réponse..."
            style={{width: '100%', height: '20vh', fontSize: '1.5vw'}}
          />
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
