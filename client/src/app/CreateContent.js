import React, { useState } from "react";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import UploadFile from "./UploadFile";
import { fetchFileUpload, fetchPost } from "../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setAppNavigation } from "./../reducer/appSlice";
import { setUploadFileContent } from "../reducer/teacherSlice";

export default function CreateContent() {
  const dispatch = useDispatch();
  const [module, setModule] = useState("1-AAAAQ");
  const [topic, setTopic] = useState("1-AAAAQ");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const teacherStore = useSelector(({ teacher }) => teacher);
  const uploadContent = async () => {
    let formData = new FormData();
    formData.append("file", teacherStore.uploadFileContent);

    const response = await fetchFileUpload("/uploadFile", formData);
    const data = {
      topic,
      title,
      module,
      description,
      fileLink: response.msg,
    };
    const fileResp = await fetchPost("/teacher/uploadFileContent", data);
    // redirect to home
    if (fileResp.data.status === "submitted") {
      alert("Content Uploaded");
      dispatch(setUploadFileContent(""));
      dispatch(setAppNavigation(`TeacherHome`));
    }
  };
  return (
    <>
      <div>CreateContent</div>
      <Container className="user-profile">
        <Row>
          <Col xs={12} sm={4}>
            Select Module
          </Col>
          <Col xs={12} sm={8}>
            <Form.Select
              onChange={e => setModule(e.target.value)}
              aria-label="Default select example"
              value={module}
            >
              <option value="1-AAAAQ">Module 1 - Digital Library</option>
              <option value="1-AAAAR">Module 2 - Game Design</option>
              <option value="1-AAAAS">Module 3 - Web Design</option>
              <option value="1-AAAAT"> Module 4 - Lego robotics</option>
              <option value="1-AAAAU">Module 5 - Introduction to 4IR</option>
              <option value="1-AAAAV">
                Module 6 - AI and Machine Learning
              </option>
              <option value="1-AAAAW"> Module 7- Ready for work</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Select Topic
          </Col>
          <Col xs={12} sm={8}>
            <Form.Select
              onChange={e => setTopic(e.target.value)}
              aria-label="Default select example"
              value={topic}
            >
              <option value="1-AAAAX">Topic 1 - History</option>
              <option value="1-AAAAY">Topic 2 - Future</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Content Title
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="text"
              id="title"
              placeholder="Topic title"
              onChange={e => setTitle(e.target.value)}
              defaultValue={title}
              aria-describedby="Content Title"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Content Description
          </Col>
          <Col xs={12} sm={8}>
            <Form.Control
              type="text"
              placeholder="Topic Description"
              id="description"
              onChange={e => setDescription(e.target.value)}
              defaultValue={description}
              aria-describedby="Content Description"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            Upload Content
          </Col>
          <Col xs={12} sm={8}>
            {/* <Form.Control
              type="text"
              id="description"
              placeholder="Topic Description"
              onChange={e => setDescription(e.target.value)}
              defaultValue={description}
              aria-describedby="Content Description"
            /> */}
            {/* <Uploadimage /> */}
            {teacherStore?.uploadFileContent?.name}
            <UploadFile />
          </Col>
        </Row>

        <Button
          variant="success"
          onClick={uploadContent}
          disabled={!teacherStore?.uploadFileContent?.name}
          //   disabled={userDbInfo.ISAPPROVED != null}
          style={{ float: "right", marginTop: "1em" }}
        >
          Upload Content
        </Button>
      </Container>
    </>
  );
}
