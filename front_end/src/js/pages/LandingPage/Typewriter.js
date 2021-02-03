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
        <p>Hi, I'm Doris. This is my personal blog.</p>
        <p>I write about tech, music, space, books and other stuff, sometimes I use Chinese.</p>
        <p>Hope you find something useful and have a good day.</p>
        {/* <p>{props.author}</p> */}
      </Typist>
    </TypeWriterWrapper>
  );
};
export default TypeWriter;
