import React, { Component } from "react";
import Welcome from "../../components/Welcome";
import Portfolio from "../../components/Portfolio";
import Registration from "../../components/Registration";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Dashboard extends Component {

  state = {
    currentPage: "Registration"
  };

  outsidefunction = event => {
    console.log("called me from oursude");
  };

  renderPage = (props) => {
    const isLoggedIn = localStorage.authentificateduser;
    if (isLoggedIn) {
      return <Portfolio />;
    } else {
      return (
        <div>
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
