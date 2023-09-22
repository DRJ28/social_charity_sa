import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { fetchFileUpload } from "../utils/apiCalls";
class Uploadimage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initially, no file is selected
      selectedFile: null,
      sucessmessage: " ",
      errormessage: " ",
    };
  }

  onChange = e => {
    // Update the state
    // select first item
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  };

  uploadFile = e => {
    e.preventDefault();
    // Create an object of formData
    let formData = new FormData();
    // Update the formData object
    formData.append("file", this.state.selectedFile);
    console.log(this.state.selectedFile);

    fetchFileUpload("/uploadFile", formData);
  };

  render() {
    return (
      <div>
        <form method="post" action="#" onSubmit={this.uploadFile}>
          <input
            type="file"
            hidden
            name="uploadfile"
            id="uploadToS3"
            onChange={this.onChange}
          ></input>
          <p> {this.state.sucessmessage}</p>
          <p>{this.state.errormessage}</p>
          <Button
            variant="primary"
            as="label"
            htmlFor="uploadToS3"
            style={{ float: "right", marginTop: "1em", cursor: "pointer" }}
          >
            Upload Files from System
          </Button>
          {/* <button> upload</button> */}
        </form>
      </div>
    );
  }
}
export default Uploadimage;
