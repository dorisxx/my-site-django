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
        margin: auto;
        margin-top: 2.5%;
        box-shadow: 0 5px 20px 0px rgba(0,0,0,1);
     }
      .card:hover{
        animation: shake 3s;
        animation-fill-mode: forwards;
      }
      @keyframes shake {
        0% {
          box-shadow: 0 5px 20px 0px rgba(0,0,0,0.6);
          transform: translatey(0px);
        }
        100% {
          box-shadow: 0 5px 20px 0px rgba(0,0,0,0.6);
          transform: translatey(-20px);
        }
      }
      .card .card-header{
        font-size: 1.8rem;
        padding-bottom: 0;
      }
      .card .card-header p{
        font-size: 0.9rem;
        margin-bottom: 0.1rem;
        color: #E4ECE4;
      }
      .card .card-body{
        font-size: 1rem;
        padding-top: 0.1rem;
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
