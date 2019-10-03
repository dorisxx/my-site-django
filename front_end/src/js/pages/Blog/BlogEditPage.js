import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../../actions";
import LoadSpinner from "../../components/Spinner";
import EditForm from "../../components/EditForm/EditForm";

class BlogEditPage extends Component {
  state = {
    content: [],
    loading: true,
    show: false,
    success: null,
    failed: null
  };

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.slug, "?edit=true");
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
  { fetchPost }
)(BlogEditPage);
