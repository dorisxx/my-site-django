import React, { Component } from "react";
import MarkDownCard from "../../components/MarkDownCard";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions";
import LoadSpinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

class BlogPage extends Component {
  state = {
    items: [],
    loading: true,
    pages: null
  };
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts && this.props.posts !== prevProps.posts) {
      this.updateState();
    }
  }

  updateState() {
    const posts = Object.values(this.props.posts);
    if (posts.length > 1) {
      this.setState({
        items: posts.slice(0, -1),
        loading: false,
        pages: posts[posts.length - 1].pages
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  renderPostList() {
    return this.state.items.map(item => {
      return (
        <MarkDownCard
          title={item.title}
          updated={item.updated}
          content={item.abstract}
          tags={item.tags}
          key={item.id}
          id={item.id}
          slug={item.slug}
          showOptions={this.props.userEmail}
          public={item.public}
          comments={item.comments.length}
        />
      );
    });
  }

  handlePageChange(pageNum = 1) {
    this.props.fetchPosts(pageNum);
  }

  render() {
    if (!this.state.loading) {
      {
        return (
          <>
            {this.renderPostList()}
            <Pagination
              key={!!this.state.loading}
              pages={this.state.pages}
              handlePageChange={pageNum => this.handlePageChange(pageNum)}
            />
          </>
        );
      }
    }
    return <LoadSpinner />;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.content,
    userEmail: state.auth.userEmail
  };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(BlogPage);
