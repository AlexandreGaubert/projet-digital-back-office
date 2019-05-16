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
    this.submitOnEnter = this.submitOnEnter.bind(this);
  }
  handleInput(e) {
    this.setState({response: e.target.value});
  }
  submitOnEnter(e) {
    if (e.key === "Enter") {
      this.submitResponse();
    }
  }
  submitResponse() {
    const { avis } = this.props;
    var updatedData = {
      ...avis,
      messages: [
        ...avis.messages,
         {from: 'foyer', content: this.state.response}
      ],
      newMessageFromFoyer: avis.newMessageFromFoyer + 1
    }
    store.dispatch({type: 'EDIT_AVIS', data: updatedData})
    this.setState({response: ""});
  }
  componentDidMount() {
    document.addEventListener('keypress', this.submitOnEnter);
    store.dispatch({type: 'EDIT_AVIS', data: {...this.props.avis, newMessageFromResident: 0}})
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.submitOnEnter)
  }
  render() {
    const { avis } = this.props;

    return(
      <div style={{position: 'relative'}}>
        <i onClick={this.props.back} style={{...styles.button, left: 0}} className="fas fa-arrow-left" />
        <h1 style={{margin: '1em'}}>Discussion avec {avis.resident.gender} {avis.resident.lastname} {avis.resident.firstname}</h1>
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
    marginLeft: from === 'resident' ? 'auto' : 0,
    marginRight: from === 'resident' ? 0 : 'auto',
    background: from === 'resident' ? "#a9a6a6" : "#6666FF"
  }
  var className = "talk-bubble tri-right btm-" + (from === "resident" ? "right" : "left") +"-in";
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
    color: 'white'
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
