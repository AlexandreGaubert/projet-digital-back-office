import React, { Component } from "react"

import axios from 'axios'

export default class SandBox extends Component {
  handleUpload(ev) {
    ev.preventDefault();

    const data = new FormData();
    // console.log(this.uploadInput.files);
    data.append('files', this.uploadInput.files[0]);
    axios.post('http://localhost:8080/upload', data)
      .then(function (response) {
          // this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
      return(
        <div class="container">
          <form onSubmit={this.handleUpload.bind(this)}>
            <div className="form-group">
              <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} multiple type="file" />
            </div>

            <div className="form-group">
              <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
            </div>

            <button className="btn btn-success" type>Upload</button>

          </form>
        </div>
      )
    }
}
