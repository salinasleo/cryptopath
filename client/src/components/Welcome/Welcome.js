import React from "react";
import "./Welcome.css";

const Welcome = ({ children }) => (

  <div className="jumbotron text-center">
    <h1>CryptoPath Dashboard!</h1>
    <br></br>
    <h2> Don't be the one left holding the bag!</h2>
    <br>
    </br>
    <br>
    </br>
    {children}

  </div>
);

export default Welcome;
