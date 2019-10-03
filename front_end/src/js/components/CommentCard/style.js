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
        padding: auto;
     }
      .card .card-header{
        font-size: 1.2rem;
      }
      .card .card-header p{
        font-size: 75%;
        color: white;
      }
      .card .card-body{
        font-size: 60%;
        padding: 1rem;
      }
      `}
  </style>
);

export default style;
