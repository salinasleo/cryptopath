import React, { Component}  from 'react';
import "./Table.css";

export const Table = ({ children }) => {
  return (
    // <table id="sortedtable" class="table table-striped table-dark">
    // <thead>
    //   <tr>
    //     <th scope="col"></th>
    //     <th scope="col">Coin</th>
    //     <th scope="col">Quantity</th>
    //     <th scope="col">Cost Basis</th>
    //     <th scope="col">Current Price</th>
    //     <th scope="col">24hr %Change</th>
    //     <th scope="col">Total Value</th>
    //     <th scope="col">Total Gain/Loss</th> 
    //   </tr>
    // </thead>
    // <tbody>
    //     {children}
    // </tbody>
    // </table>

    <table id="sortedtable" class="table table-striped table-dark table-sm">
    <thead>
      <tr>
        <th class="th-sm">
        </th>
        <th class="th-sm">Coin
        <i class="fa fa-sort float-right" aria-hidden="true"></i>
        </th>
        <th class="th-sm">Quantity
        {/* <i class="fa fa-sort float-right" aria-hidden="true"></i> */}
        </th>
        <th class="th-sm">Cost Basis
        {/* <i class="fa fa-sort float-right" aria-hidden="true"></i> */}
        </th>
        <th class="th-sm">Current Price
        {/* <i class="fa fa-sort float-right" aria-hidden="true"></i> */}
        </th>
        <th class="th-sm">24hr %Change
        <i class="fa fa-sort float-right" aria-hidden="true"></i>
        </th>
        <th class="th-sm">Total Value
        <i class="fa fa-sort float-right" aria-hidden="true"></i>
        </th>
        <th class="th-sm">Total Gain/Loss
        <i class="fa fa-sort float-right" aria-hidden="true"></i>
        </th> 
      </tr>
    </thead>
    <tbody>
        {children}

    </tbody>
    </table>
  );
};
