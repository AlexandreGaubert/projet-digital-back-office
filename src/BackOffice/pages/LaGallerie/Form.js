import React, { Component } from "react"

export default class Form extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    if (props.type === "create") {
      this.state = {
        name: '',
        imagesName: '',
        files: [],
      }
    }
    else if (props.type === "edit") {
      this.state = {
        ...props.data
      }
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onFileChange(e) {
    this.setState({imagesName: e.target.value, files: e.target.files});
  }
  render() {
    const { files } = this.state;
    const { type } = this.props;

    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-" + (type === 'edit' ? "pencil-alt" : "plus")}/>
          {(type === "create" ? " Ajouter" : (type === "edit" ? " Editer" : null))}
        </h1>
        <form style={styles.form} action="http://localhost:8080/create-gallery" method="post" encType="multipart/form-data">
          <input
            name="name"
            placeholder="Titre..."
            style={{...styles.input, margin: 0}}
          />
          <input
            type='file'
            multiple='multiple'
            accept="image/*"
            name="photo"
            placeholder="Votre Image..."
            style={{...styles.input, margin: 0}}
          />
          <button type="submit" style={styles.button}>AJOUTER</button>
        </form>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eaedf2',
    padding: '0 1em',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    borderBottom: '2px solid #ccc',
    paddingBottom: '.5em'
  },
  input: {
    margin: '1em 0',
    fontSize: '1.5em',
    padding: '.5em'
  },
  button: {
    padding: '.5em 0',
    fontSize: '1.5em',
    margin: '.5em 0',
    backgroundColor: '#7BAE7F',
    borderRadius: 0,
    border: 0,
    cursor: 'pointer',
    color: 'white'
  }
}
