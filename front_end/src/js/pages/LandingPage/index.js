import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQuote } from "../../actions";
import TypeWriter from "../LandingPage/Typewriter";

class QuoteShow extends Component {
  state = {
    id: null,
    author: null,
    body: null,
    loading: true
  };

  componentDidMount() {
    ("hello");
    this.props.fetchQuote();
  }

  componentDidUpdate(prevProps) {
    if (this.props.quote && this.props.quote !== prevProps.quote) {
      this.updateState();
    }
  }

  updateState() {
    const { body, author, id } = this.props.quote[0];

    this.setState({
      id: id,
      author: `-- ${author}`,
      body: body,
      loading: false
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <TypeWriter
          id={this.state.id}
          author={this.state.author}
          body={this.state.body}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    quote: state.content
  };
};

export default connect(
  mapStateToProps,
  { fetchQuote }
)(QuoteShow);
