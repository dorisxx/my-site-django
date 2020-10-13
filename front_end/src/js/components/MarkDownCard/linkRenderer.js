import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled.a`
  &:link {
    color: #e4ece4;
    text-shadow: 0px 0px 30px #fdec6e;
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    cursor: pointer;
  }
`;
class LinkRenderer extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string
  };

  render() {
    if (this.props.href.match(/^(https?:)?\/\//)) {
      return (
        <StyledLink href={this.props.href} target="_blank">
          {this.props.children[0].props.value}
        </StyledLink>
      );
    }

    return <Link to={this.props.href}>{this.props.children}</Link>;
  }
}

export default LinkRenderer;
