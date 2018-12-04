import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10, color: "#c8b7b5" }} className="btn btn-dark">
    {props.children}
  </button>
);
