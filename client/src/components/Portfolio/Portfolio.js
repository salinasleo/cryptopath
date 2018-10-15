import React, { Component } from "react";
import "./Portfolio.css";
import { Col, Row, Container } from "../../components/Grid";
import AddCoin from "../../components/AddCoin";
import $ from 'jquery';
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import Coins from "../../utils/Coins";
import DeleteBtn from "../../components/DeleteBtn";
import { List, ListItem } from "../../components/List";
import Icons from "../../components/IconsPriced";

var request = require("request");
var usethisport;

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


function getPrices(coin) {
    console.log("Getting prices from API...");

    var omdb = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coin + "&tsyms=USD&extraParams=cryptopath";

    request(omdb, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var Prices = JSON.parse(body);
            console.log(Prices);
            console.log("Prices length is " + Object.keys(Prices.DISPLAY).length);
            parsePrices(Prices);
        }

    });
};

function parsePrices(Prices) {
    var i;
    var coins = Object.keys(Prices.DISPLAY);
    console.log(coins);
    console.log("length is " + coins.length);

    for (i = 0; i < coins.length; i++) {

        var path = "Prices.DISPLAY." + coins[i];

        console.log(path);


        // console.log("Price: " + Prices.DISPLAY.BTC.USD.PRICE + '\n' +
        //           "Last Updated: " + Prices.DISPLAY.BTC.USD.LASTUPDATE + '\n'     ) ;

        console.log("Price: " + eval(path + ".USD.PRICE") + '\n' +
            "Last Updated: " + eval(path + ".USD.LASTUPDATE") + '\n' +
            "Percent Change 24hrs: " + eval(path + ".USD.CHANGEPCT24HOUR") + "%" + '\n');

    }
};

getPrices("ETH,BTC,LTC,XMR,IOTA,XLR,DOGE");

//   console.log("this is port global" + usethisport);



class Portfolio extends Component {
    state = {
        username: localStorage.authentificateduser,
        addcoins: true,
        coin: "BTC",
        quantity: "",
        cost: "",
        purchasedate: "",
        notes: "",
        portfolio: [],
        stateicons: [
            {
                clicked: false,
                url: "/bitcoin",
                src: "./images/bitcoin.ico",
                name: "bitcoin",
                ticker: "BTC",
                price: "$6,650",
                speed: "20s",
                styling: "App-logo"
            },

            {
                clicked: false,
                url: "/ethereum",
                src: "./images/ethereum.ico",
                name: "ethereum",
                ticker: "ETH",
                price: "$224",
                speed: "20s",
                styling: "App-logo-counter-fast"
            },

            {
                clicked: false,
                url: "/litecoin",
                src: "./images/litecoin.ico",
                name: "litecoin",
                ticker: "LTC",
                price: "$54",
                speed: "20s",
                styling: "App-logo-fast"
            }
            ,

            {
                clicked: false,
                url: "/monero",
                src: "./images/monero.ico",
                name: "monero",
                ticker: "XMR",
                price: "$117",
                speed: "20s",
                styling: "App-logo-counter"
            },

            {
                clicked: false,
                url: "/lisk",
                src: "./images/lisk.ico",
                name: "lisk",
                ticker: "LSK",
                price: "$4.10",
                speed: "20s",
                styling: "App-logo"
            },

            {
                clicked: false,
                url: "/kin",
                src: "./images/kin.ico",
                name: "kin",
                ticker: "KIN",
                price: "$0.06",
                speed: "20s",
                styling: "App-logo-counter-fast"
            },

            {
                clicked: false,
                url: "/stellar",
                src: "./images/stellar.ico",
                name: "stellar",
                ticker: "XLM",
                price: "$0.34",
                speed: "20s",
                styling: "App-logo-fast"
            },

            {
                clicked: false,
                url: "/dash",
                src: "./images/dash.ico",
                name: "dash",
                ticker: "DASH",
                price: "$200",
                speed: "20s",
                styling: "App-logo-counter"
            },

            {
                clicked: false,
                url: "/iota",
                src: "./images/iota.ico",
                name: "iota",
                ticker: "IOTA",
                price: "$0.54",
                speed: "20s",
                styling: "App-logo"
            }
            ,

            {
                clicked: false,
                url: "/doge",
                src: "./images/doge.ico",
                name: "doge",
                ticker: "DOGE",
                price: "$1.34",
                speed: "20s",
                styling: "App-logo-counter-fast"
            }
        ]
    };


    componentDidMount() {
        document.getElementById("hidden_elements").style.display = "none";
        this.coinadded();
        this.getportfolio();
    }

    renderIcons() {

        var showthese = this.state.stateicons.filter(function (visibleicon) {
            return visibleicon.clicked === false;
        });

        return showthese.map((icon, index) => (
            <Icons {...icon} alt={icon.name} handleClick={this.handleClick} />
        ));
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
            .then(res => {
                this.coinadded();
                this.getportfolio();
            })
            .catch(err => {
                console.log(err);
                alert("Oops, something went wrong. " + err);
            }
            );
    };

    getportfolio = id => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        console.log("getting portfolio");
        Coins.getportfolio(this.state.username)
            .then(res => {
                this.setState({ portfolio: res.data })
                console.log(this.state.portfolio);
                var usethisport = this.state.portfolio;
                var i;
                var k;
                var j;
                var portforapi;
                for (k = 0; k < this.state.stateicons.length; k++) {
                    this.state.stateicons[k].clicked = true;
                    for (j = 0; j < usethisport.length; j++) {
                        console.log("icons array " + k + " " + this.state.stateicons[k].ticker);
                        console.log("port array " + j + " " + usethisport[j].coin);
                        if (usethisport[j].coin === this.state.stateicons[k].ticker) {
                            console.log("matched");
                            this.state.stateicons[k].clicked = false;
                        }
                    }
                }
                for (i = 0; i < usethisport.length; i++) {
                    if (i === 0) { portforapi = usethisport[i].coin }
                    else { portforapi = portforapi.concat(usethisport[i].coin) };
                    if (i < usethisport.length - 1) { portforapi = portforapi.concat(",") };
                }
                console.log("portforapi is " + portforapi);
                this.portfoliorender();
            }
            )
            .catch(err => console.log(err));
    };

    portfoliorender = () => {
        console.log("render portfolio");
    };

    coinadded = () => {
        console.log("Thank you for adding new coin");
        this.getportfolio();
    };

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this)
    };

    handleplusclick = event => {
        this.setState(state => ({
            addcoins: false
        }));
    };

    deleteCoin = id => {
        Coins.deleteCoin(id)
            .then(res => this.getportfolio())
            .catch(err => console.log(err));
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
            <div>
                <header className="App-header">
                    {this.renderIcons()}
                    {/* <h1 className="App-title">Welcome to CryptoPath</h1> */}
                </header>

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
                                            <option value="DASH">Dash</option>
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
                    <br></br>
                    {this.state.portfolio.length ? (
                        <List>
                            {this.state.portfolio.map(portfolio => {
                                return (
                                    <li class="list-group-item d-flex justify-content-between align-items-center" key={portfolio._id}>
                                        <a id="coinAtag" href={"/coins/" + portfolio.coin}>
                                            <strong id="coinAtag">
                                                {portfolio.coin} <span class="badge badge-dark badge-pill">{portfolio.quantity}</span>
                                            </strong>
                                        </a>
                                        <DeleteBtn onClick={() => this.deleteCoin(portfolio._id)} />
                                    </li>
                                );
                            })}
                        </List>
                    ) : (
                            <h3>No Results to Display. Add Coins. </h3>
                        )}
                </div>
            </div>
        );
    }

};

export default Portfolio;

