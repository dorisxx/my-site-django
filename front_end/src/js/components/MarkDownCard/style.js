import React from "react";

const style = () => (
  <style type="text/css">
    {`
      .card {
        z-index:1;
        background: inherit;
        width: 90%;
        color: white;
        overflow: hidden;
        border-radius: 16px;
        margin: auto;
        margin-top: 2%;
      }
      .card:before{
        z-index: -1;
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        filter: blur(10px);
        box-shadow: inset 0 0 0 3000px rgba(255,255,255,0.13);
      }
      .card .badge{
          margin: 0.2vh 0.5vw;
          font-size: 80%;
      }
      .card .card-header{
        font-size: 1.8rem;
        padding-bottom: 0;
      }
      .card .card-header p{
        font-size: 0.8rem;
        margin-bottom: 0.1rem;
        color: #E4ECE4;
      }
      .card .card-body{
        font-size: 1rem;
        padding-bottom: 0;
      }
      tr {
        border-top: 2px solid #c6cbd1;
        background: inherit;
        color: white;
      }
      th,
      td {
        padding: 6px 13px;
        border: 2px solid #dfe2e5;
      }
      blockquote {
        display: flex;
        flex-direction: column;
        background: inherit;
        margin: 1.5em 10px;
        padding: 0.5em 10px;
      }
      blockquote:before {
        color: #ccc;
        content: open-quote;
        font-size: 4em;
        line-height: 0.01em;
      }
      blockquote:after {
        color: #ccc;
        content: close-quote;
        font-size: 4em;
        line-height: 0.05em;
        vertical-align: -0.4em;
        margin-top: 0.5em;
      }
      blockquote p {
        display: inline;
      }
      `}
  </style>
);

export default style;
