import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import TextareaAutosize from "react-autosize-textarea";
import RandomCard from "../RandomCard ";
import Style from "./Style";
import api from "../../apis";

const Wrapper = styled.div`
  border: none;
  color: white;
  padding: 5%;
  font-size: 1.2rem;
`;

class RandomEditForm extends React.Component {
  state = {
    body: "",
    updated: "",
    public: true
  };

  componentDidMount() {
    console.log(this.props.content);
    if (this.props.content) {
      this.setState({
        body: this.props.content.body,
        updated: this.props.content.updated,
        public: this.props.content.public
      });
    }
  }

  handleChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState[id] = value;
      return newState;
    });
  };

  handleCheckChange() {
    this.setState({ ...this.state, public: !this.state.public });
  }

  updatePost(data) {
    api
      .patch(`/random/${this.props.content.id}/`, data)
      .then(() => {
        alert("post saved successfully");
        this.redirectToRandom();
      })
      .catch(() => alert("saving post failed."));
  }

  saveNewPost(data) {
    api
      .post(`/random/`, data)
      .then(() => {
        alert("post saved successfully");
        this.redirectToRandom();
      })
      .catch(() => alert("saving post failed."));
  }

  redirectToRandom() {
    this.props.history.push("/random/");
  }

  updateOrNewPost(data) {
    if (this.props.new) {
      this.saveNewPost(data);
    } else {
      this.updatePost(data);
    }
  }

  handleSave() {
    const data = {
      body: this.state.body,
      public: this.state.public
    };

    this.updateOrNewPost(data);
  }

  renderMarkDown() {
    const item = this.state;
    return (
      <RandomCard
        content={item.body}
        updated={item.updated}
        public={item.public}
      />
    );
  }

  render() {
    return (
      <>
        <Style />
        <Container style={{ position: "absolute", left: 0 }}>
          <Row style={{ width: "100vw", margin: "auto" }}>
            <Col sm={5}>
              <Wrapper>
                Body
                <TextareaAutosize
                  id="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
                <Form.Check
                  label={"Public"}
                  checked={this.state.public}
                  onChange={this.handleCheckChange.bind(this)}
                />
                <Button
                  variant="danger"
                  size="lg"
                  onClick={this.handleSave.bind(this)}
                >
                  Save
                </Button>
              </Wrapper>
            </Col>
            <Col sm={7}>{this.renderMarkDown()}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(RandomEditForm);
