import React, { Component } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from "styled-components";

const TextWrapper = styled.div`
  margin: auto;
  margin-bottom: 30px;
  border: none;
  width: 85%;
  color: white;
  font-size: 1.1rem;
`;



export default class WorkPage extends Component {
  render() {
    return <>
      <style type="text/css">
        {`
      .nav-tabs {
        background: inherit;
        width: 90%;
      }
      .nav-tabs a {
        background:inherit;
        border: none;
      }
      .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active,
      .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link:hover{
        color: white;
        border: none;
        text-decoration: none;
        background-color: transparent;
        text-shadow: 0px 0px 15px white, 0px 0px 15px white, 0px 0px 15px white;;
      }
      .tab-content{
        margin: auto;
      }
      `}
      </style>
      <TextWrapper>
        <Tabs defaultActiveKey="music">
          <Tab eventKey="music" title="Music">
            <p style={{ margin: "5%" }}>
              <p><a href="https://musescore.com/user/33333175/scores/5847842/s/XdFkb3" target="_blank">Waltz on a rainy day</a></p>
              This is a piece that I had a lot of fun writing, it's in classical A-B-A form where it modulates to a major key in the middle section(learned from Chopin 😉).
              It's called 'waltz on a rainy day' because I literally came up with the theme on a rainy moody day. Hope you enjoy it!
            </p>
            <iframe width="100%" height="400" src="https://musescore.com/user/33333175/scores/5847842/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe>
          </Tab>
          <Tab eventKey="project" title="Project" disabled>
          </Tab>
          <Tab eventKey="art" title="Art" disabled>
          </Tab>
          <Tab eventKey="piano" title="Piano" disabled>
          </Tab>
        </Tabs>
      </TextWrapper>
    </>
  }
}