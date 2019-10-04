import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import CodeBlock from "./codeRenderer";
import linkRenderer from "./linkRenderer";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import moment from "moment/moment.js";
import EditPanel from "../EditPanel";
import Style from "./style";

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script"
});

export default class RandomCard extends Component {
  static defaultProps = {
    header: true
  };
  render() {
    return (
      <>
        <Style />
        <Card>
          {this.props.showOptions && <EditPanel random id={this.props.id} />}
          {this.props.header && (
            <Card.Header>
              {this.props.title}
              {this.props.updated && (
                <p>
                  {moment(this.props.updated).format(
                    "dddd, MMMM Do YYYY, h:mm A"
                  )}{" "}
                </p>
              )}
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
