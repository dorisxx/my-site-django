import React, { Component } from "react";
import MarkDownCard from "../../components/MarkDownCard";
import { connect } from "react-redux";
import { Badge } from "react-bootstrap";
import { fetchPosts } from "../../actions";
import LoadSpinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import TagCard from "../../components/TagCard";
import styled from "styled-components";
import { NavLink } from "react-router-dom";


const TagNameWrapper = styled.div`
  margin: 10px auto;
  border: none;
  width: 90%;
    & .badge {
      margin: auto 10px;
    } 
`;

const TextWrapper = styled.div`
  margin: auto;
  margin-bottom: 30px;
  border: none;
  width: 90%;
`;



class BlogPage extends Component {
  state = {
    items: [],
    loading: true,
    pages: null,
    filteredItems: [],
    filterOption: null,
  };
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts && this.props.posts !== prevProps.posts) {
      this.updateState();
    }
  }

  filterPostsByTag(tagid) {
    let newItems = [];
    let tagName = "";
    this.state.items.forEach(ele => {
      if (ele.tags && ele.tags.length > 0) {
        let tmp = ele.tags.filter(i => i.id == tagid);
        if (tmp.length > 0) {
          tagName = tmp[0].name;
          newItems.push(ele)
        }
      }
    })
    this.setState({
      filteredItems: newItems,
      filterOption: tagName,
      pages: newItems.length
    })
  }

  updateState() {
    const posts = Object.values(this.props.posts);
    if (posts.length > 1) {
      this.setState({
        items: posts.slice(0, -1),
        filteredItems: posts.slice(0, -1),
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
    return this.state.filteredItems.map(item => {
      return (
        <MarkDownCard
          title={item.title}
          updated={item.updated}
          created={item.created}
          content={item.abstract}
          tags={item.tags}
          key={item.id}
          id={item.id}
          slug={item.slug}
          showOptions={this.props.userEmail}
          public={item.public}
          comments={item.comments.length}
          showCreated
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
            {this.state.filterOption && <TagNameWrapper>About <Badge variant="light">{this.state.filterOption}</Badge></TagNameWrapper>}
            {this.renderPostList()}
            <TagCard
              onFilteredByTag={tagid => this.filterPostsByTag(tagid)}
            />
            {!this.state.filterOption && <Pagination
              key={!!this.state.loading}
              pages={this.state.pages}
              handlePageChange={pageNum => this.handlePageChange(pageNum)}
            />}
            {this.state.filterOption && <TextWrapper><NavLink to="/blog" onClick={() => this.setState({ filterOption: null })}>Back to All</NavLink></TextWrapper>}
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
