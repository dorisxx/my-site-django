import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import moment from "moment/moment.js";
import Style from "./style";

export default class CommentCard extends Component {
  static defaultProps = {
    header: true
  };
  render() {
    return (
      <>
        <Style />
        <Card>
          {this.props.header && (
            <Card.Header>
              {this.props.updated && (
                <>
                  <p>
                    <Badge variant="light">{this.props.name}</Badge>{" "}
                    {" said on "}
                    {moment(this.props.updated).format(
                      "MMMM Do YYYY, h:mm A"
                    )}{" "}
                  </p>
                </>
              )}
            </Card.Header>
          )}
          <Card.Body>{this.props.content}</Card.Body>
        </Card>
      </>
    );
  }
}
