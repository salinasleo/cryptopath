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

/*these are fixed icons pre loggin in*/
var staticicons = [
  {
    clicked: false,
    url: "/bitcoin",
    src: "./images/bitcoin.ico",
    name: "bitcoin",
    price: "$6,650",
    speed: "20s",
    styling: "App-logo-static"
  },

  {
    clicked: false,
    url: "/ethereum",
    src: "./images/ethereum.ico",
    name: "ethereum",
    price: "$224",
    speed: "20s",
    styling: "App-logo-static"
  },

  {
    clicked: false,
    url: "/litecoin",
    src: "./images/litecoin.ico",
    name: "litecoin",
    price: "$54",
    speed: "20s",
    styling: "App-logo-static"
  }
];


class Dashboard extends Component {

  state = {
    currentPage: "Registration"
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
          </header>
          <Welcome>
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
