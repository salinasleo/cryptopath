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
    price: "$6,650",
    speed: "20s",
    styling: "App-logo"
  },

  {
    clicked: false,
    url: "/ethereum",
    src: "./images/ethereum.ico",
    name: "ethereum",
    price: "$224",
    speed: "20s",
    styling: "App-logo-counter-fast"
  },

  {
    clicked: false,
    url: "/litecoin",
    src: "./images/litecoin.ico",
    name: "litecoin",
    price: "$54",
    speed: "20s",
    styling: "App-logo-fast"
  }
  // ,

  // {
  //   clicked: false,
  //   url: "/monero",
  //   src: "./images/monero.ico",
  //   name: "monero",
  //   price: "$117",
  //   speed: "20s",
  //   styling: "App-logo-counter"
  // },

  // {
  //   clicked: false,
  //   url: "/lisk",
  //   src: "./images/lisk.ico",
  //   name: "lisk",
  //   price: "$4.10",
  //   speed: "20s",
  //   styling: "App-logo"
  // },

  // {
  //   clicked: false,
  //   url: "/kin",
  //   src: "./images/kin.ico",
  //   name: "kin",
  //   price: "$0.06",
  //   speed: "20s",
  //   styling: "App-logo-counter-fast"
  // },

  // {
  //   clicked: false,
  //   url: "/stellar",
  //   src: "./images/stellar.ico",
  //   name: "stellar",
  //   price: "$0.34",
  //   speed: "20s",
  //   styling: "App-logo-fast"
  // },

  // {
  //   clicked: false,
  //   url: "/dash",
  //   src: "./images/dash.ico",
  //   name: "dash",
  //   price: "$200",
  //   speed: "20s",
  //   styling: "App-logo-counter"
  // },

  // {
  //   clicked: false,
  //   url: "/iota",
  //   src: "./images/iota.ico",
  //   name: "iota",
  //   price: "$0.54",
  //   speed: "20s",
  //   styling: "App-logo"
  // },

  // {
  //   clicked: false,
  //   url: "/doge",
  //   src: "./images/doge.ico",
  //   name: "doge",
  //   price: "$0.54",
  //   speed: "20s",
  //   styling: "App-logo-counter-fast"
  // }
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
