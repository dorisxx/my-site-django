import React from "react";
import styled from "styled-components";
import { Pagination } from "react-bootstrap";
import _ from "lodash";
import { COLORS } from "../constants"

const PaginationWrapper = styled.div`
  overflow: hidden;
  width: 90%;
  text-align: center;
  margin: auto;
  margin-top: 0;
  display: flex;
  justify-content: center;
  & .pagination {
    padding: 5px;
    display: inline-flex;
    justify-content: space-even;
  }
  & .pagination li .page-link {
    color: ${COLORS.text};
    background-color: transparent;
    font-size: 1rem;
    line-height: 35px;
    border: none !important;
    border-color: transparent;
    transition: all 0.4s ease 0s;
    box-shadow: none;
  }
  & .pagination li.active .page-link,
  & .pagination li .page-link:hover {
    color: ${COLORS.text};
    border: none;
    font-size: 1.5rem;
    text-align: center;
    background-color: transparent;
    text-shadow: 0px 0px 15px white, 0px 0px 15px white, 0px 0px 15px white;
  }
  & .pagination li.disabled .page-link {
    color: ${COLORS.visited};
    border: none;
    background-color: transparent;
  }
  & .pagination li.ellipsis .page-link {
    cursor: none;
    border: none;
    background-color: transparent;
  }
  @media only screen and (max-width: 600px) {
    & .pagination {
      display: block;
      border-radius: 20px;
    }
    & .pagination li {
      margin: 5px 2px;
      display: inline-block;
    }
  }
`;

export default class Pages extends React.Component {
  state = {
    active: 1
  };

  renderItems() {
    let items = [];
    let nums = [];
    const pages = this.props.pages;
    const active = this.state.active;
    if (pages > 5) {
      let start = active - 2;
      if (start > 1 && start < pages - 4) {
        nums.push([start - 1]);
        nums = nums.concat(_.range(start, start + 5));
        nums.push(start + 5);
      } else if (start <= 1) {
        nums = nums.concat(_.range(1, start + 5));
        nums.push([start + 5]);
      } else {
        nums.push([start - 1]);
        nums = nums.concat(_.range(start, pages + 1));
      }
    } else {
      nums = nums.concat(_.range(1, pages + 1));
    }
    nums.map(i => {
      if (!Array.isArray(i)) {
        items.push(
          <Pagination.Item
            onClick={() => this.pageChanged(i)}
            id={i}
            key={i}
            active={i === this.state.active}
          >
            {i}
          </Pagination.Item>
        );
      } else {
        items.push(
          <Pagination.Ellipsis
            onClick={() => this.pageChanged(i[0])}
            id={i[0]}
            key={i[0]}
            active={i[0] === this.state.active}
          />
        );
      }
    });

    items.unshift(
      <Pagination.First
        onClick={() => this.pageChanged(1)}
        key={"first"}
        disabled={this.state.active === 1}
      />
    );
    items.push(
      <Pagination.Last
        onClick={() => this.pageChanged(pages)}
        key={"last"}
        disabled={this.state.active === pages}
      />
    );
    return items;
  }

  pageChanged(pageNum) {
    if (pageNum !== this.state.active) {
      this.props.handlePageChange(pageNum);
      this.setState({ active: pageNum });
    }
  }

  render() {
    if (this.props.pages) {
      return (
        <PaginationWrapper>
          <Pagination>{this.renderItems()}</Pagination>
        </PaginationWrapper>
      );
    }
    return null;
  }
}
