import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRandomPost } from "../../actions";
import LoadSpinner from "../../components/Spinner";
import EditForm from "../../components/EditForm/EditForm";

class RandomEditPage extends Component {
  state = {
    content: [],
    loading: true,
    show: false,
    success: null,
    failed: null
  };

  componentDidMount() {
    this.props.fetchRandomPost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.post && this.props.post !== prevProps.post) {
      this.setState({ content: this.props.post, loading: false });
    }
  }

  render() {
    if (!this.state.loading) {
      {
        return <EditForm content={this.state.content} />;
      }
    }
    return <LoadSpinner />;
  }
}

const mapStateToProps = state => {
  return {
    post: state.content
  };
};

export default connect(
  mapStateToProps,
  { fetchRandomPost }
)(RandomEditPage);
