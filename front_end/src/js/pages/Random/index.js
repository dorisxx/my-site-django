import React, { Component } from "react";
import RandomCard from "../../components/RandomCard ";
import { connect } from "react-redux";
import { fetchRandomPosts } from "../../actions";
import LoadSpinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: auto;
  border: none;
  color: white;
  width: 90%;
  padding: 1.1rem;
  font-size: 1rem;
  font-style: oblique;
`;

class BlogPage extends Component {
  state = {
    items: [],
    loading: true,
    pages: null
  };
  componentDidMount() {
    this.props.fetchRandomPosts();
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
        <RandomCard
          updated={item.created}
          content={item.body}
          key={item.id}
          id={item.id}
          showOptions={this.props.userEmail}
        />
      );
    });
  }

  handlePageChange(pageNum = 1) {
    this.props.fetchRandomPosts(pageNum);
  }
  render() {
    if (!this.state.loading) {
      {
        return (
          <>
            <Wrapper>
              "The world is like a spinning kaleidoscope, here are some of my{" "}
              <del>random</del> thoughts, observations and discoveries."
            </Wrapper>
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
  { fetchRandomPosts }
)(BlogPage);
