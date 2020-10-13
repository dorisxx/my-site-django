import React from "react";
import { SIZES } from "../../constants"

const style = () => (
  <style type="text/css">
    {`
      .card {
        z-index:1;
        background: inherit;
        overflow: hidden;
     }
      .card .card-header{
        font-size: ${SIZES.card_header};
      }
      .card .card-header p{
        font-size: ${SIZES.card_subheader};
      }
      .card .card-body{
        font-size: ${SIZES.text};
      }
      `}
  </style>
);

export default style;
