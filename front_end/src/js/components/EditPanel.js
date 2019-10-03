import React, { Component } from "react";
import { ButtonGroup, Button, Badge } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AlertModal from "../components/Modal";
import api from "../apis";

class EditPanel extends Component {
  state = {
    clicked: null
  };

  handleClick(e) {
    let clicked = e.target.id;
    switch (clicked) {
      case "edit":
        this.setState({ clicked: "edit" });
        break;
      case "delete":
        this.setState({ clicked: "delete" });
        break;
      default:
    }
  }

  render() {
    if (this.state.clicked === "edit") {
      if (this.props.random) {
        return <Redirect to={`/random/edit/${this.props.id}`} />;
      }
      return <Redirect to={`/blog/edit/${this.props.slug}`} />;
    }
    return (
      <>
        {this.state.clicked === "delete" && (
          <AlertModal key={Math.random()} slug={this.props.slug} />
        )}
        <ButtonGroup
          aria-label="Basic example"
          onClick={this.handleClick.bind(this)}
        >
          <Button id="edit" variant="info">
            Edit
          </Button>
          <Button id="delete" variant="danger">
            Delete
          </Button>
          <Button
            id="public"
            variant={this.props.public ? "danger" : "primary"}
            disabled
          >
            {this.props.public ? "Currently public" : "Currently private"}
          </Button>
        </ButtonGroup>
      </>
    );
  }
}

export default EditPanel;
