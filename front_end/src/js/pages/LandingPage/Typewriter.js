import React from "react";
import styled from "styled-components";
import Typist from "react-typist";
import { COLORS, SIZES } from "../../constants";

const TypeWriterWrapper = styled.div`
  overflow: hidden;
  width: 90%;
  text-align: left;
  font-size: ${SIZES.text}
  color: ${COLORS.text};
  margin: 5% auto;
  // padding: 20px;
  letter-spacing: 0.05em;
  // & p {
  //   margin: 20px;
  //   text-align: right;
  // }
`;

const TypeWriter = props => {
  return (
    <TypeWriterWrapper>
      <Typist key={props.id} cursor={{ show: false }} avgTypingDelay={25}>
        {/* {props.body} */}
        <p>Hi, I'm Doris.</p>
        <p>I write about music, space, computers, books and other stuff here.</p>
        <p>Sometimes I write in Chinese.</p>
        {/* <p>{props.author}</p> */}
      </Typist>
    </TypeWriterWrapper>
  );
};
export default TypeWriter;
