import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import MarkDownCard from "../MarkDownCard";
import TextareaAutosize from "react-autosize-textarea";
import Style from "./Style";
import CreatableSelect from "react-select/creatable";
import api from "../../apis";

const Wrapper = styled.div`
  border: none;
  color: white;
  padding: 5%;
  font-size: 1.2rem;
`;

class EditForm extends React.Component {
  state = {
    title: "",
    abstract: "",
    body: "",
    currentTags: [],
    allTags: [],
    updated: "",
    public: true
  };

  componentDidMount() {
    const allTagOptions = [];
    api.get("/tags").then(response => {
      if (response.data) {
        response.data.map(item => {
          allTagOptions.push({ value: item.id, label: item.name });
        });
      }
    });

    const currentTagOptions = [];

    if (this.props.content) {
      this.props.content.tags.map(item => {
        currentTagOptions.push({ value: item.id, label: item.name });
      });

      this.setState({
        title: this.props.content.title,
        abstract: this.props.content.abstract
          ? this.props.content.abstract
          : "",
        body: this.props.content.body,
        allTags: allTagOptions,
        currentTags: currentTagOptions,
        updated: this.props.content.updated,
        public: this.props.content.public
      });
    } else {
      this.setState({
        ...this.state,
        allTags: allTagOptions,
        updated: new Date()
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

  handleTagChange = valueArray => {
    this.setState({ ...this.state, currentTags: valueArray });
  };

  handleCheckChange() {
    this.setState({ ...this.state, public: !this.state.public });
  }

  updatePost(data) {
    api
      .patch(`/posts/${this.props.content.slug}/?edit=true&update=true`, data)
      .then(() => {
        alert("post saved successfully");
        this.redirectToBlog();
      })
      .catch(() => alert("saving post failed."));
  }

  saveNewPost(data) {
    api
      .post("/posts/?edit=true", data)
      .then(() => {
        alert("post saved successfully");
        this.redirectToBlog();
      })
      .catch(() => alert("saving post failed."));
  }

  redirectToBlog() {
    this.props.history.push("/blog/");
  }
  updateOrNewPost(data) {
    if (this.props.new) {
      this.saveNewPost(data);
    } else {
      this.updatePost(data);
    }
  }

  handleSave() {
    const tags = [];
    const newTag = [];
    this.state.currentTags.map(item => {
      if (item.__isNew__) {
        newTag.push({ name: item.label });
      } else {
        tags.push(item.value);
      }
    });
    const data = {
      title: this.state.title,
      abstract: this.state.abstract,
      body: this.state.body,
      public: this.state.public,
      tag_ids: tags
    };

    if (newTag.length > 0) {
      api.post("/tags/", newTag).then(response => {
        response.data.map(item => data.tag_ids.push(item.id));
        this.updateOrNewPost(data);
      });
    } else {
      this.updateOrNewPost(data);
    }
  }
  renderMarkDown() {
    const item = this.state;
    return (
      <MarkDownCard
        title={item.title}
        abstract={item.abstract}
        content={item.body}
        updated={item.updated}
        tags={item.currentTags}
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
                Abstract
                <TextareaAutosize
                  id="abstract"
                  value={this.state.abstract}
                  onChange={this.handleChange}
                />
                Title
                <TextareaAutosize
                  id="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                Tags
                <CreatableSelect
                  className="tag-select"
                  value={this.state.currentTags}
                  options={this.state.allTags}
                  onChange={this.handleTagChange}
                  isMulti
                ></CreatableSelect>
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

export default withRouter(EditForm);
