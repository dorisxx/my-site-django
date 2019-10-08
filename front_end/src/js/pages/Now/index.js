import React, { Component } from "react";
import MarkDownCard from "../../components/MarkDownCard";
import { connect } from "react-redux";
import { fetchNow } from "../../actions";
import LoadSpinner from "../../components/Spinner";

class NowPage extends Component {
  state = {
    updated: null,
    abstract: null,
    title: null,
    slug: null,
    loading: true
  };
  componentDidMount() {
    this.props.fetchNow();
  }

  componentDidUpdate(prevProps) {
    if (this.props.now && this.props.now !== prevProps.now) {
      this.updateState();
    }
  }

  updateState() {
    const { abstract, updated, title, slug } = this.props.now;
    this.setState({
      abstract: abstract,
      updated: updated,
      title: title,
      slug: slug,
      loading: false
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <MarkDownCard
          key={this.state.updated}
          slug={this.state.slug}
          updated={this.state.updated}
          content={this.state.abstract}
          title={this.state.title}
          showOptions={this.props.userEmail}
          noabout
        />
      );
    }
    return <LoadSpinner />;
  }
}

const mapStateToProps = state => {
  return {
    now: state.content,
    userEmail: state.auth.userEmail
  };
};

export default connect(
  mapStateToProps,
  { fetchNow }
)(NowPage);
