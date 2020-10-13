import React from "react";
import { COLORS, SIZES } from "../../constants"

const style = () => (
  <style type="text/css">
    {`
      .card {
        z-index:1;
        background: inherit;
        width: 90%;
        color: ${COLORS.text};
        overflow: hidden;
        border: none;
        margin: auto;
        margin-top: 3%;
        padding:0;
      }
      .card .badge{
          margin: 0.2vh 0;
          font-size: 80%;
      }
      .card .card-header{
        font-size:${SIZES.card_header};
        padding-bottom: 0;
        padding: 0;
        background-color: white;
        border: none;
      }
      .card .card-header p{
        font-size: 0.8rem;
        margin-bottom: 0.1rem;
        color: ${COLORS.text};
      }
      .card .card-body{
        font-size: 1rem;
        padding-bottom: 0;
        padding-top: 0;
        padding: 0;
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
