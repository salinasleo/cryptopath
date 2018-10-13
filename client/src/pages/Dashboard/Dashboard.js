import React, { Component } from "react";
import Welcome from "../../components/Welcome";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Dashboard extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    password: ""
  };

  // When the form is submitted, use the API.saveUser method to save the user data
  // Then reload users from the database
  signOn = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      console.log("you clicked button");

      API.saveUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => this.loadCoins())
        .catch(err => console.log(err));
    }
  };

  registerUser = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      console.log("you clicked button");

      API.saveUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => this.loadCoins())
        .catch(err => console.log(err));
    }
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (this.state.password.length < 6) {
      alert(`Choose a more secure (longer) password`);
      return;
    } if (this.state.username && this.state.password) {
      console.log("you clicked button");

      API.saveUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => this.loadCoins())
        .catch(err => console.log(err));
    }
  };




  loadCoins = () => {
    console.log("loading coins");
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Welcome>
        <br>
        </br>
        <br>
        </br>
        <Row>
          <Col size="md-4"></Col>
          <Col size="md-4">
            <h4>Login to see your portfolio</h4>
          </Col>
        </Row>
        <Row>
          <Col size="md-5"></Col>
          <Col size="md-2">
            <form>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="User Name: "
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password: "
                type="password"
              />

              <FormBtn
                disabled={!(this.state.username && this.state.password)}
                onClick={this.signOn}
              >
                Sign on
              </FormBtn>

              <FormBtn2
                disabled={!(this.state.username && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Register New
              </FormBtn2>


            </form>
          </Col>
        </Row>
        {/* <Row>
          <Col size="md-12 sm-12">
            <h1>Coins in your portfolio</h1>
          </Col>
        </Row> */}
      </Welcome>
    );
  }
}

export default Dashboard;
