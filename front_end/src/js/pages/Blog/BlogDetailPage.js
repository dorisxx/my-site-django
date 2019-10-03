import React, { Component } from "react";
import CommentCard from "../../components/CommentCard";
import MarkDownCard from "../../components/MarkDownCard";
import CommentForm from "../../components/CommentForm";
import { connect } from "react-redux";
import { fetchPost } from "../../actions";
import LoadSpinner from "../../components/Spinner";
import styled from "styled-components";
import api from "../../apis/";
import AlertMsg from "../../components/Alert";

const Wrapper = styled.div`
  border: none;
  color: white;
  padding: 5%;
  font-size: 1rem;
`;

class BlogDetailPage extends Component {
  state = {
    content: [],
    loading: true,
    show: false,
    success: null,
    failed: null
  };

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.post && this.props.post !== prevProps.post) {
      this.setState({ content: this.props.post, loading: false });
    }
  }

  renderPostDetail() {
    const item = this.state.content;
    return (
      <MarkDownCard
        title={item.title}
        updated={item.updated}
        content={item.body}
        tags={item.tags}
        key={item.id}
        id={item.id}
        slug={item.slug}
        public={item.public}
      />
    );
  }

  renderComments() {
    return this.state.content.comments.map(item => {
      return (
        <CommentCard
          name={item.name}
          updated={item.created}
          content={item.content}
          key={item.id}
        />
      );
    });
  }

  handleCommentFormSubmit(e, data) {
    e.preventDefault();
    const postData = { ...data, post: this.state.content.id };
    api
      .post("/comments/", postData)
      .then(response => {
        const newComments = this.state.content.comments;
        const newContent = this.state.content;
        newComments.unshift(response.data);
        newContent.comments = newComments;
        this.setState({
          ...this.state,
          content: newContent,
          success: true
        });
      })
      .catch(() => this.setState({ ...this.state, failed: true }));
  }

  showAlert(status) {
    return status ? (
      <AlertMsg
        success={status}
        show={true}
        key={Math.random()}
        content="Congrats! Your comment has been added"
      />
    ) : (
      <AlertMsg
        success={status}
        show={true}
        content="Sorry something went wrong, plz try again"
      />
    );
  }

  render() {
    if (!this.state.loading) {
      {
        return (
          <>
            {this.renderPostDetail()}
            <Wrapper>
              Wanna say something?
              <CommentForm
                handleCommentFormSubmit={this.handleCommentFormSubmit.bind(
                  this
                )}
              />
              {this.state.success === true && this.showAlert(true)}
              {this.state.failed === true && this.showAlert(false)}
            </Wrapper>
            {this.renderComments()}
          </>
        );
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
)(BlogDetailPage);
