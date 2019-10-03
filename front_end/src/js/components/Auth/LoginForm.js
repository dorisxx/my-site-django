import React from "react";
import { Form, Button } from "react-bootstrap";
import Style from "./style";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    const type = e.target.type;
    const value = e.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState[type] = value;
      return newState;
    });
  };

  render() {
    return (
      <>
        <Style />
        <Form onSubmit={e => this.props.handleLogin(e, this.state)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Cast your spell</Form.Label>
            <Form.Control
              type="email"
              placeholder="I solemnly swear that I am up to no good"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Magic word</Form.Label>
            <Form.Control
              type="password"
              placeholder="Be careful"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Mischief Managed
          </Button>
        </Form>
      </>
    );
  }
}

export default LoginForm;
