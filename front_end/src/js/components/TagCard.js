import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoadSpinner from "./Spinner";
import api from "../apis"
import styled from "styled-components";

const TagWrapper = styled.div`
  margin: 15px auto;
  border: none;
  width: 90%;
  font-size:small;
  color: white;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
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
                    console.log(item)
                    allTagOptions.push({ value: item.id, label: item.name });
                });
                this.setState({ tags: allTagOptions, loading: false })
            }
        });
    }

    renderTags() {
        console.log(this.state.tags)
        return this.state.tags.map(tag => {
            return (
                <Badge variant="light" key={tag.label}>
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
                        {/* <NavLink key={this.props.id} to={`/blog/${this.props.slug}`}>
                            {this.props.title}
                        </NavLink> */}
                        All tags:
                        {this.renderTags()}
                    </TagWrapper>
                </>
            );
        }
        return <LoadSpinner />;
    }
}
