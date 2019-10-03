import React from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const SpinnerWrapper = styled.div`
  overflow: hidden;
  width: 90%;
  text-align: center;
  color: white;
  margin: 5% auto;
  padding: 20px;
  letter-spacing: 0.15em;
`;

const LoadSpinner = props => {
  return (
    <SpinnerWrapper>
      <Spinner animation="border" variant="light" size="sm" />
      <Spinner animation="border" variant="light" />
      <Spinner animation="border" variant="light" size="sm" />
    </SpinnerWrapper>
  );
};

export default LoadSpinner;
