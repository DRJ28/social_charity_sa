import React from "react";
import { Button } from "react-bootstrap";
import { setUploadFileContent } from "../reducer/teacherSlice";
import { useDispatch } from "react-redux";

export default function UploadFile() {
  const dispatch = useDispatch();
  const onFileChange = e => {
    const file = e.target.files[0];
    dispatch(setUploadFileContent(file));
  };
  return (
    <div>
      {/* <form method="post" action="#" onSubmit={this.uploadFile}> */}
      <input
        type="file"
        hidden
        name="uploadfile"
        id="uploadToS3"
        onChange={onFileChange}
      ></input>
      {/* <p> {this.state.sucessmessage}</p>
        <p>{this.state.errormessage}</p> */}
      <Button
        variant="primary"
        as="label"
        htmlFor="uploadToS3"
        style={{ float: "right", marginTop: "1em", cursor: "pointer" }}
      >
        Upload Files from System
      </Button>
      {/* <button> upload</button> */}
      {/* </form> */}
    </div>
  );
}
