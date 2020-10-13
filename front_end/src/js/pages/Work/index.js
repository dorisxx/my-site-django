import React, { Component } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from "styled-components";
import { COLORS, SIZES } from "../../constants"

const TextWrapper = styled.div`
  margin: auto;
  margin-top: 5%;
  border: none;
  width: 90%;
  color: ${COLORS.text};
  font-size: ${SIZES.text};

  & p {
    margin-bottom: 0;
  }

  & a {
    text-decoration: underline !important;
  }
`;

const HeaderWrapper = styled.div`
  font-size: ${SIZES.card_header};
  margin-bottom: 10px;
  margin-top: 20px;
`;


export default class WorkPage extends Component {
  render() {
    return <>
      <TextWrapper>
        <HeaderWrapper>
          Music
        </HeaderWrapper>
        <p>I compose and sometimes transcribe.</p>
        <p>Check out my musescore page <a target="_blank" href="https://musescore.com/user/33333175">here</a>.</p>

      </TextWrapper>
    </>
  }
}