import React from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

class CommentForm extends React.Component {
  initialState = {
    email: "",
    name: "",
    content: ""
  };

  state = this.initialState;

  handleChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState[id] = value;
      return newState;
    });
  };

  render() {
    return (
      <>
        <Form
          onSubmit={e => {
            this.props.handleCommentFormSubmit(e, this.state);
            this.setState(() => this.initialState);
          }}
        >
          <InputGroup className="mb-3" size="sm" >
            <InputGroup.Prepend >
              <InputGroup.Text style={{ backgroundColor: "white" }} id="basic-addon1">Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              required
              id={"name"}
              value={this.state.name}
              onChange={this.handleChange}
            />
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}>Email</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="email"
              id={"email"}
              placeholder="Only visible to me"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3" size="sm">
            <FormControl
              as="textarea"
              id={"content"}
              aria-label="With textarea"
              placeholder="Say whatever you like"
              style={{ minHeight: "2rem" }}
              role="content"
              required
              value={this.state.content}
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button variant="light" type="submit" style={{ border: "1px solid #ced4da" }}>
                Submit
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </>
    );
  }
}

export default CommentForm;
