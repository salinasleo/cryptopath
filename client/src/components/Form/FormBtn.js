import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "left", marginBottom: 10, marginright: 10, marginleft:10, paddingleft: 10, paddingright: 10 }} className="btn btn-seondary">
  {props.children} 
  </button>

);
