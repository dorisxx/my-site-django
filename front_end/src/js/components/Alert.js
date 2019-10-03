import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertMsg = props => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert
        variant={props.success ? "success" : "danger"}
        onClose={() => setShow(false)}
        size="sm"
        dismissible
      >
        {props.content}
      </Alert>
    );
  }
  return null;
};

export default AlertMsg;
