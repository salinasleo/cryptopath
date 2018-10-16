import React from "react";
import "./Table.css";

export const Table = ({ children }) => {
  return (
    <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Coin</th>
        <th scope="col">Quantity</th>
        <th scope="col">Cost Basis</th>
        <th scope="col">Current Price</th>
        <th scope="col">24hr %Change</th>
        {/* <th scope="col">Total Value</th>
        <th scope="col">Total Gain/Loss</th> */}
        {/* <th scope="col">Lastest Price</th>
        <th scope="col">Gain/Loss</th> */}
      </tr>
    </thead>
    <tbody>
        {children}
    </tbody>
    </table>
  );
};
