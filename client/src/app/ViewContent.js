import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGet, fetchPost } from "../utils/apiCalls";
import { setViewMyContents } from "../reducer/studentSlice";
import { Row, Col, Form, Container, Button, ListGroup } from "react-bootstrap";

export default function ViewContent() {
  const dispatch = useDispatch();
  const [contentList, setContentList] = useState([]);
  const loadMyContent = async () => {
    const content = await fetchGet("/student/getAllContent");
    dispatch(setViewMyContents(content.data));
    setContentList(content.data);
  };
  useEffect(() => {
    loadMyContent();
  }, []);

  const downloadRes = async link => {
    const dlink = await fetchPost("/getFile", { link });
    const anch = document.createElement("a");
    anch.setAttribute("href", "#");
    anch.setAttribute("download", dlink.file || "data.json");
    anch.style.display = "none";

    document.body.appendChild(anch);

    anch.click();

    document.body.removeChild(anch);
  };
  return (
    <>
      <div>ViewContent</div>
      <ListGroup>
        {contentList.map(list => {
          return (
            <ListGroup.Item key={list.RESOURCE_LINK}>
              <Row>
                <Col>Content: {list.CONTENT_TITLE}</Col>
                <Col>Desc: {list.RESOURCE_DESCRIPTION}</Col>
                <Col>Content: {list.RESOURCE_LINK}</Col>
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => downloadRes(list.RESOURCE_LINK)}
                    style={{ float: "right", marginTop: "1em" }}
                  >
                    Download
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
