import React, { Component } from "react";
import MarkDownCard from "../../components/MarkDownCard";
import { connect } from "react-redux";
import { fetchAbout } from "../../actions";
import LoadSpinner from "../../components/Spinner";

class AboutPage extends Component {
  state = {
    updated: null,
    abstract: null,
    title: null,
    slug: null,
    loading: true
  };
  componentDidMount() {
    this.props.fetchAbout();
  }

  componentDidUpdate(prevProps) {
    if (this.props.about && this.props.about !== prevProps.about) {
      this.updateState();
    }
  }

  updateState() {
    const { abstract, updated, title, slug } = this.props.about;
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
          updated={this.state.updated}
          content={this.state.abstract}
          title={this.state.title}
          showOptions={this.props.userEmail}
          slug={this.state.slug}
          isAbout
        />
      );
    }
    return <LoadSpinner />;
  }
}

const mapStateToProps = state => {
  return {
    about: state.content,
    userEmail: state.auth.userEmail
  };
};

export default connect(
  mapStateToProps,
  { fetchAbout }
)(AboutPage);
