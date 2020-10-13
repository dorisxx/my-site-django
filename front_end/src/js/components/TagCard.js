import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoadSpinner from "./Spinner";
import api from "../apis"
import styled from "styled-components";
import { COLORS } from "../constants"

const TagWrapper = styled.div`
  margin: 15px auto;
  border: none;
  width: 90%;
  font-size:small;
  color: ${COLORS.text};
  display:flex;
  flex-wrap: wrap;
  align-items: center;
  & .badge {
      margin: auto 10px;
      cursor: pointer;
  } 
  }
`;

export default class TagCard extends Component {

    state = {
        tags: [],
        loading: true
    }

    componentDidMount() {
        const allTagOptions = [];
        api.get("/tags").then(response => {
            if (response.data) {
                response.data.map(item => {
                    allTagOptions.push({ value: item.id, label: item.name });
                });
                this.setState({ tags: allTagOptions, loading: false })
            }
        });
    }

    renderTags() {
        return this.state.tags.map(tag => {
            return (
                <Badge variant="light" key={tag.label} id={tag.value} onClick={(e) => this.props.onFilteredByTag(e.target.id)}>
                    {tag.label}
                </Badge>
            );
        });
    }

    render() {
        if (!this.state.loading) {
            return (
                <>
                    <TagWrapper>
                        All tags:
                        {this.renderTags()}
                    </TagWrapper>
                </>
            );
        }
        return <LoadSpinner />;
    }
}
