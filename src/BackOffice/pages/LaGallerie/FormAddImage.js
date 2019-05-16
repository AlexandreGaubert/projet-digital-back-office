import React, { Component } from "react"

export default class FormAddImage extends Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    this.state = {
      imageName: '',
      imageData: []
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({imageName: e.target.value, imageData: e.target.files});
  }
  render() {
    return(
      <div style={styles.container}>
        <h1 style={styles.title}><i className={"fas fa-plus"}/>
          {" Ajouter une image"}
        </h1>
        <form style={styles.form} action="http://localhost:8080/add-image-to-gallery" method="post" encType="multipart/form-data">
          <input
            type='file'
            multiple='multiple'
            accept="image/*"
            name="photo"
            placeholder="Votre Image..."
            style={{...styles.input, margin: 0}}
          />
          <input hidden={true} name="_id" value={this.props.id}/>
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
    color: 'white'
  }
}
