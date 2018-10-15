import React, { Component } from "react";
import "./Portfolio.css";
import { Col, Row, Container } from "../../components/Grid";
import AddCoin from "../../components/AddCoin";
import $ from 'jquery';
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import Coins from "../../utils/Coins";


$(document).on("click", '#logout', logout);

function logout() {
    localStorage.clear();
    window.location.reload();
};


$(document).on("click", '#addcoin', addcoinReveal);


function addcoinReveal() {
    document.getElementById("hidden_elements").style.display = "block";
};

$(document).on("click", '#noaddcoin', noaddcoinReveal);


function noaddcoinReveal() {
    document.getElementById("hidden_elements").style.display = "none";
};

const datenow = Date.now();
// const monthplaceholder = datenow.getMonth();
// const yearplaceholder = datenow.getDay();
// const dayplaceholder = datenow.getYear();

class Portfolio extends Component {
    state = {
        username:localStorage.authentificateduser,
        addcoins: true,
        coin: "Bitcoin",
        quantity: "",
        cost: "",
        purchasedate: "", 
        notes: ""
    };

    componentDidMount() {
        document.getElementById("hidden_elements").style.display = "none";
    }

    addCoinSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        console.log("you tried to add a coin");
        Coins.saveCoin({
            username: this.state.username,
            coin: this.state.coin,
            quantity: this.state.quantity,
            purchaseprice: this.state.purchaseprice,
            purchasedate: this.state.purchasedate,
            notes: this.state.notes
        })
            .then(res => this.coinadded())
            .catch(err => {
                console.log(err);
                alert("Oops, something went wrong. " + err);
            }
            );
    };

  

    coinadded = () => {
        console.log("Thank you for adding new coin");
      };

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value} = event.target;
        this.setState({
            [name]: value
        });
        console.log(this)
    };

        // Handles updating component for select form
        handleInputChangeOption = event => {
            const { name, select } = event.target.value;
            this.setState({
                [name]: select
            });
            console.log(this)
        };

    handleplusclick = event => {
        this.setState(state => ({
            addcoins: false
        }));
    };

    handleminusclick = event => {
        this.setState(state => ({
            addcoins: true,
            coin: "",
            quantity: "",
            cost: "",
            purchasedate: "", 
            notes: ""
        }));
    };

    renderPage = () => {
        if (this.state.addcoins) {
            return <AddCoin />;
        }
    };

    render() {
        return (
            <div className="jumbotron text-center">
                <h7>Welcome {localStorage.authentificateduser}!  &nbsp; <span title="Logout" class="fas fa-sign-out-alt" id="logout"></span> </h7>
                <Row>&nbsp;
                    <Col size="md-12 sm-12">

                        {this.state.addcoins ?
                            (<h2>Coins in your portfolio &nbsp; <a title="Add Coins" class="fa fa-plus-circle" id="addcoin" onClick={this.handleplusclick}></a></h2>)
                            :
                            (<h2>Coins in your portfolio &nbsp; <a title="Add Coins" class="fa fa-minus-circle" id="noaddcoin" onClick={this.handleminusclick}></a></h2>)
                        }
                    </Col>
                </Row>

                <br></br>
                <Row>
                    <Col size="md-5"></Col>
                    <Col size="md-2">
                        <div id="hidden_elements">
                            <form>
                                <div class="form-group">
                                    {/* <label for="exampleFormControlSelect1">Coin</label> */}
                                    <select name="coin" class="form-control" type="text" id="coinselect" value={this.state.value}
                                        onChange={this.handleInputChange} aria-describedby="coinselectHelp">
                                        <option value="BTC">Bitcoin</option>
                                        <option value="ETH">Ethereum</option>
                                        <option value="LTC">Litecoin</option>
                                        <option value="IOTA">IOTA</option>
                                        <option value="DOGE">DOGE</option>
                                        <option value="XMR">Monero</option>
                                        <option value="XLM">Stellar</option>
                                        <option value="Dash">Dash</option>
                                    </select>
                                    <small id="coinselectHelp" class="text">
                                        Required. Other fields optional.
                                        </small>
                                </div>

  {/* <div>
               <select id="lang" onChange={this.change} value={this.state.value}>
                  <option value="select">Select</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
               </select>
               <p></p>
               <p>{this.state.value}</p>
           </div> */}
                                
                                <Input
                                    value={this.state.quantity}
                                    onChange={this.handleInputChange}
                                    name="quantity"
                                    type="number"
                                    step="0.000000001"
                                    min="0"
                                    placeholder="Coin Quantity" aria-describedby="quantityHelp"
                                />
                                <Input
                                    value={this.state.purchaseprice}
                                    onChange={this.handleInputChange}
                                    type="number"
                                    step="0.000000001"
                                    min="0"
                                    name="purchaseprice"
                                    placeholder="$USD Cost per Coin"
                                />
                                <Input
                                    value={this.state.purchasedate}
                                    onChange={this.handleInputChange}
                                    type="date"
                                    name="purchasedate"
                                    placeholder="Purchased on MM/DD/YYYY" /*{datenow}*/
                                />
                                   <Input
                                    value={this.state.notes}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    name="notes"
                                    placeholder="notes" /*{datenow}*/
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

