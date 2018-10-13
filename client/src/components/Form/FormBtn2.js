import React from "react";

export const FormBtn2 = props => (
  <button {...props} style={{ float: "right" }} className="btn btn-seondary">
    {props.children} 
  </button>

);
