import React, { Component } from "react";
import Welcome from "../../components/Welcome";
import Portfolio from "../../components/Portfolio";
import Registration from "../../components/Registration";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Icons from "../../components/Icons";


var staticicons = [
  {
    clicked: false,
    url: "/bitcoin",
    src: "./images/bitcoin.ico",
    name: "bitcoin",
    price: "$6,650"    ,
    speed: "20s",
    styling: "App-logo-static"
  },

  {
    clicked: false,
    url: "/ethereum",
    src: "./images/ethereum.ico",
    name: "ethereum",
    price: "$224"    ,
    speed: "20s",
    styling: "App-logo-static"
  },

  {
    clicked: false,
    url: "/litecoin",
    src: "./images/litecoin.ico",
    name: "litecoin",
    price: "$54"    ,
    speed: "20s",
    styling: "App-logo-static"
  }
];


class Dashboard extends Component {

  state = {
    currentPage: "Registration"
  };

  outsidefunction = event => {
    console.log("called me from oursude");
  };

  renderIcons() {
    return staticicons.map((icon, index) => (
      <Icons {...icon} alt={icon.name} handleClick={this.handleClick} />
    ));
  }
    

  renderPage = (props) => {
    const isLoggedIn = localStorage.authentificateduser;
    if (isLoggedIn) {
      return <Portfolio />;
    } else {
      return (
        <div>
            <header className="App-header">
            {this.renderIcons()}
            {/* <h1 className="App-title">Welcome to CryptoPath</h1> */}
          </header>

          <Welcome>
            <br>
            </br>
            <Registration />
          </Welcome>
        </div>);
    }
  };


  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}

export default Dashboard;
