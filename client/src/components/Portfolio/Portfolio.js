import React , { Component } from "react";
import "./Portfolio.css";
import { Col, Row, Container } from "../../components/Grid";
import AddCoin from "../../components/AddCoin";
import $ from 'jquery';
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import Coins from "../../utils/API";


$(document).on("click", '#logout', logout);

function logout() {
    localStorage.clear();
    window.location.reload();
};

window.onload=function() {
    document.getElementById("hidden_elements").style.display="none";
  }

$(document).on("click", '#addcoin', addcoinReveal);


function addcoinReveal() {
    document.getElementById("hidden_elements").style.display="block";
};

const datenow=  Date.now();
// const monthplaceholder = datenow.getMonth();
// const yearplaceholder = datenow.getDay();
// const dayplaceholder = datenow.getYear();

class Portfolio extends Component {
    state = {
        addcoins: false,
        coin: "",
        quantity: "",
        cost:"",
        purchasedate:""
    };

    addCoinSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
   
          Coins.saveCoins({
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
        };

            // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    renderPage = () => {
        if (this.state.addcoins) {
            return <AddCoin />;
        }
    };

    render() {
        return (
                <div className="jumbotron text-center">
                    <h7>Welcome {localStorage.authentificateduser}! &nbsp; &nbsp; <span title="Logout" class="fas fa-sign-out-alt" id="logout"></span> </h7>
                    <Row>
                        <Col size="md-12 sm-12">
                            <h2>Coins in your portfolio <span title="Add Coins" class="fa fa-plus" id="addcoin"></span></h2>
                        </Col>
                    </Row>

<br></br>
<Row>
<Col size="md-5"></Col>
<Col size="md-2">
<div id="hidden_elements">
  <form>
    {/* <Input
      value={this.state.username}
      onChange={this.handleInputChange}
      name="coin"
      placeholder="BTC"
    /> */}
     <div class="form-group">
    {/* <label for="exampleFormControlSelect1">Coin</label> */}
    <select class="form-control" id="coinselect" value={this.state.username}
      onChange={this.handleInputChange}>
      <option>Bitcoin</option>
      <option>Ethereum</option>
      <option>Litecoin</option>
      <option>IOTA</option>
      <option>DOGE</option>
    </select>
  </div>
    <Input
      value={this.state.password}
      onChange={this.handleInputChange}
      name="quantity"
      placeholder="Coin Quantity"
    />
    <Input
      value={this.state.password}
      onChange={this.handleInputChange}
      name="cost"
      placeholder="$USD Cost per Coin"
    />
    <Input
      value={this.state.password}
      onChange={this.handleInputChange}
      name="purchasedate"
      placeholder= "10/16/2018" /*{datenow}*/
    />
    <FormBtn
      onClick={this.addCoinSubmit}
    >
      Add Coin
    </FormBtn>
  </form>
  </div>
</Col>
</Row>

            </div>
 );
}

};

export default Portfolio;

