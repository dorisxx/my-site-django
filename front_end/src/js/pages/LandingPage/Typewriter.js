import React from "react";
import styled from "styled-components";
import Typist from "react-typist";

const TypeWriterWrapper = styled.div`
  overflow: hidden;
  width: 90%;
  text-align: left;
  color: white;
  margin: 5% auto;
  padding: 20px;
  letter-spacing: 0.15em;
  & p {
    margin: 20px;
    text-align: right;
  }
`;

const TypeWriter = props => {
  return (
    <TypeWriterWrapper>
      <Typist key={props.id} cursor={{ show: false }} avgTypingDelay={50}>
        {props.body}
        <p>{props.author}</p>
      </Typist>
    </TypeWriterWrapper>
  );
};
export default TypeWriter;
