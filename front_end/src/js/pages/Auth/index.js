import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import { connect } from "react-redux";
import { signIn } from "../../actions";
import api from "../../apis/";

class LoginPage extends Component {
  state = {
    logged_in: false,
    userEmail: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.userEmail && this.props.userEmail !== prevProps.userEmail) {
      this.setState({
        logged_in: true,
        userEmail: this.props.userEmail
      });
    }
  }

  handleLogin(e, data) {
    e.preventDefault();
    api
      .post("/portus", data)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        this.props.signIn();
      })
      .catch(() => null);
  }

  render() {
    return this.state.userEmail ? (
      <Redirect to="/" />
    ) : (
      <LoginForm handleLogin={this.handleLogin.bind(this)} />
    );
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.auth.userEmail
  };
};

export default connect(
  mapStateToProps,
  { signIn }
)(LoginPage);
