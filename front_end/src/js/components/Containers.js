import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import bgGif from "../assets/skyme3_8.gif";
import { withRouter } from "react-router-dom";

const BackGroundContainer = styled.div`
  background-image: url(${bgGif});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  margin: -5px -10px -10px -5px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: -20;
  @media screen and (max-width: 600px) {
    background-size: cover;
  }
  filter: ${props =>
    props.location.pathname === "/" ? "blur(0px)" : "blur(20px)"};
`;

const ContentContainer = styled.div`
  margin: auto;
  width: 70%;
  border: none;
  z-index: 5;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const GlobalStyle = createGlobalStyle`
body{
  margin:0;
  font-family: 'Raleway';
  font-size: 1.3rem;
  background-color: rgb(14,25,55);
}
*{
  box-sizing: border-box
}
.form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.form-control {
  border:none;
}
a:link { 
  color : white; text-decoration : none;
}
a:visited{color:white ; text-decoration: none;}
a:hover {
  text-decoration : underline;
  color: #E4ECE4;
  text-shadow:0px 0px 30px #fdec6e;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
`;

const RouterBackGroundContainer = withRouter(props => (
  <BackGroundContainer {...props} />
));

export { ContentContainer, GlobalStyle, RouterBackGroundContainer };
