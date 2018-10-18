import React, { Component } from "react";
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import Dashboard from "../../pages/Dashboard";
import "./Registration.css";

window.setTimeout(updatePricesfromAPI, 2000);

function updatePricesfromAPI(apiprices) {
  console.log(apiprices);
  // console.log("process.env.REACT_APP_SECRET_CODE is " + process.env.REACT_APP_SECRET_CODE);
};


class Registration extends Component {
  // Setting our component's initial state
  state = {
    username: "",
    password: "",
    authenticated: false, 
    alertmsg: ""
  };


  signOn = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {

      API.login(this.state.username)
        .then(res => {
          // console.log("response pwd is");
          // console.log(res);
          // console.log(res.data.password);
          var pwdres = res.data.password;
          console.log(pwdres);
          if (pwdres === this.state.password) {
            //   alert("passwords match, good to go");
            this.state.authenticated = true;
            localStorage.setItem("authentificateduser", this.state.username);
            window.location.reload();
          }
          else {
            alert("wrong passord");
          };
        })
        .catch(err => {
          alert("User does not exist. " + err);

          console.log(err);
        })
    };
  };


  register = event => {
    event.preventDefault();
    if (this.state.password.length < 6) {
      alert(`Choose a more secure (longer) password`);
      return;
    } if (this.state.username && this.state.password) {
      console.log("you clicked button");

      API.saveUser({
        username: this.state.username,
        password: this.state.password,
        date: Date.now()
      })
        .then(res => this.newuser())
        .catch(err => {
          console.log(err);
          alert("Oops, username already exists. " + err);
        }
        );
    }
  };

  logout = event => {
    localStorage.clear();
  };


  newuser = () => {
    console.log("Thank you for registering");
    this.state.authenticated = true;
    localStorage.setItem("authentificateduser", this.state.username);
    window.location.reload();
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
      <div>
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
                onClick={this.register}
              >
                Register
              </FormBtn2>

            </form>
          </Col>
        </Row>

        {/* <div class="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div> */}

      </div>
    );
  }

}

export default Registration;