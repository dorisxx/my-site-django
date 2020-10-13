import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import CodeBlock from "./codeRenderer";
import linkRenderer from "./linkRenderer";
import { Card, Badge } from "react-bootstrap";
import EditPanel from "../EditPanel";
import { NavLink } from "react-router-dom";
import moment from "moment/moment.js";
import Style from "./style";

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script"
});

export default class MarkDownCard extends Component {
  static defaultProps = {
    header: true
  };
  renderTags() {
    if (this.props.tags) {
      return this.props.tags.map(tag => {
        return (
          <Badge variant="light" key={tag.label || tag.name}>
            {tag.label || tag.name}
          </Badge>
        );
      });
    }
  }

  render() {
    return (
      <>
        <Style />
        <Card>
          {this.props.abstract && (
            <>
              <Card.Header>
                <h1>Abstract</h1>
              </Card.Header>
              <Card.Body>
                <ReactMarkdown
                  source={this.props.abstract}
                  escapeHtml={false}
                  renderers={{
                    code: CodeBlock,
                    link: linkRenderer
                  }}
                  astPlugins={[parseHtml]}
                />
              </Card.Body>
            </>
          )}
        </Card>
        <Card>
          {this.props.showOptions && (
            <EditPanel
              slug={this.props.slug}
              id={this.props.id}
              public={this.props.public}
            />
          )}
          {this.props.header && (
            <Card.Header>
              <NavLink key={this.props.id} to={`/blog/${this.props.slug}`} style={this.props.isAbout ? { pointerEvents: 'none' } : {}}>
                {this.props.title}
              </NavLink>
              {this.props.updated && (
                <p>
                  Posted on {moment(this.props.showCreated ? this.props.created : this.props.updated).format("MMM Do YYYY")}{" "}
                  {!this.props.isAbout && <>about {this.renderTags()}</>}
                  {this.props.comments > 0 && (
                    <>
                      with{" "}
                      <Badge variant="light">{this.props.comments}</Badge>
                      {this.props.comments > 1 ? <> comments </> : <>comment</>}
                    </>
                  )}
                </p>
              )}
              <p></p>
            </Card.Header>
          )}
          <Card.Body>
            <ReactMarkdown
              source={this.props.content}
              escapeHtml={false}
              renderers={{
                code: CodeBlock,
                link: linkRenderer
              }}
              astPlugins={[parseHtml]}
            />
          </Card.Body>
        </Card>
      </>
    );
  }
}
