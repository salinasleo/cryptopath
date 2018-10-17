import React, { Component } from "react";
import "./Portfolio.css";
import { Col, Row, Container } from "../../components/Grid";
import { Table, Tablerow } from "../../components/Table";
import AddCoin from "../../components/AddCoin";
import $ from 'jquery';
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";
import Coins from "../../utils/Coins";
import Iconsutil from "../../utils/Iconsutil";
import DeleteBtn from "../../components/DeleteBtn";
import { List, ListItem } from "../../components/List";
import Icons from "../../components/IconsPriced";

var request = require("request");
var usethisport;
var apiprices = [];
var pricepair = {};

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


function getPrices() {
    console.log("Getting prices from API...");
    var omdb = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=?fsym=USDT,BTC,ETH,XRP,BCH,EOS,XLM,LTC,ADA,XMR,TRX,IOTA,DASH,BNB,NEO,ETC,XEM,XTZ,VET,DOGE,ZEC,MKR,BTG,OMG,ZRX,ONT,DCR,QTUM,LSK,KIN'&tsyms=USD&extraParams=cryptopath";

    request(omdb, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var Prices = JSON.parse(body);
            console.log(Prices);
            console.log("Prices length is " + Object.keys(Prices.DISPLAY).length);
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
                pricepair = {
                    coin: coins[i], price: eval(path + ".USD.PRICE"), percent_change_24: eval(path + ".USD.CHANGEPCT24HOUR")
                };
                apiprices.push(pricepair);
            }
            console.log(apiprices);
        }

    });
};

getPrices();




//   console.log("this is port global" + usethisport);



class Portfolio extends Component {
    state = {
        username: localStorage.authentificateduser,
        addcoins: true,
        coin: "BTC",
        quantity: "",
        purchaseprice: "",
        purchasedate: "",
        notes: "",
        portfolio: [],
        stateicons: [],
        price: "",
        percent_change_24: "",
        port_value: "",
        gain_loss: ""
    };

    componentDidMount() {
        document.getElementById("hidden_elements").style.display = "none";
        this.geticons();
        this.getPrices();
        this.getportfolio();
        this.coinadded();

    }


    getPrices() {
        console.log("Getting prices from API...");
        var omdb = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=?fsym=USDT,BTC,ETH,XRP,BCH,EOS,XLM,LTC,ADA,XMR,TRX,IOTA,DASH,BNB,NEO,ETC,XEM,XTZ,VET,DOGE,ZEC,MKR,BTG,OMG,ZRX,ONT,DCR,QTUM,LSK,KIN'&tsyms=USD&extraParams=cryptopath";

        request(omdb, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var Prices = JSON.parse(body);
                console.log(Prices);
                console.log("Prices length is " + Object.keys(Prices.DISPLAY).length);
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
                    pricepair = {
                        coin: coins[i], price: eval(path + ".USD.PRICE"), percent_change_24: eval(path + ".USD.CHANGEPCT24HOUR")
                    };
                    apiprices.push(pricepair);
                    if (i === coins.length - 1) {
                        console.log(apiprices);
                        console.log("done getting prices")
                    };
                }

            }

        });
    };


    renderIcons() {

        var showthese = this.state.stateicons.filter(function (visibleicon) {
            return visibleicon.clicked === false;
        });

        return showthese.map((icon, index) => (
            <Icons {...icon} alt={icon.name} handleClick={this.handleClick} />
        ));
    }

    // preaddCoinSubmit = event => {
    //     // Preventing the default behavior of the form submit (which is to refresh the page)
    //     event.preventDefault();
    //     console.log("prescrub to add a coin");
    //     console.log(apiprices);
    //     var i;
    //     for (i=0; i<apiprices.length; i++) {
    //         if (apiprices[i].coin === this.state.coin) {
    //             console.log("trying hard");
    //             console.log(apiprices[i].coin);
    //             console.log(apiprices[i].price);
    //             console.log(this.state.price);
    //             console.log(this.state.coin);
    //             this.setState({ price: apiprices[i].price});
    //             console.log(this.state.price);
    //             this.setState({ percent_change_24: apiprices[i].percent_change_24});
    //             this.setState({ port_value: apiprices[i].price*this.state.quantity});
    //             this.setState({ gain_loss: (apiprices[i].price - this.state.purchaseprice)*this.state.quantity});
    //         }
    //     }
    //     if (i = apiprices.length) {
    //         console.log("latest state pre add is " +  this.state.price);
    //     this.addCoinSubmit();
    //     }
    // };


    addCoinSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        console.log("now add a coin");
        console.log(apiprices);
        var i;
        for (i = 0; i < apiprices.length; i++) {
            if (apiprices[i].coin === this.state.coin) {
                console.log("trying hard");
                console.log(apiprices[i].coin);
                console.log(apiprices[i].price);
                console.log(this.state.price);
                console.log(this.state.coin);
                this.setState({ price: apiprices[i].price });
                console.log(this.state.price);
                this.setState({ percent_change_24: apiprices[i].percent_change_24 });
                i = apiprices.length;
            }
        };
        Coins.saveCoin({
            username: this.state.username,
            coin: this.state.coin,
            quantity: this.state.quantity,
            purchaseprice: this.state.purchaseprice,
            purchasedate: this.state.purchasedate,
            notes: this.state.notes,
            price: this.state.price,
            percent_change_24: this.state.percent_change_24,
            port_value: this.state.port_value,
            gain_loss: this.state.gain_loss
        })
            .then(res => {
                this.coinadded();
                this.getportfolio();
                console.log(this.state.price);
            })
            .catch(err => {
                console.log(err);
                alert("Oops, something went wrong. " + err);
            }
            );
    };


    geticons = id => {
        console.log("getting icons");
        Iconsutil.getIcons()
            .then(res => {
                this.setState({ stateicons: res.data })
                console.log(this.state.stateicons);
                console.log("res of geticons" + res.data);
            }
            ).catch(err => console.log(err));
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
                // update whether to display or not
                for (k = 0; k < this.state.stateicons.length; k++) {
                    this.state.stateicons[k].clicked = true;
                    for (j = 0; j < usethisport.length; j++) {
                        // console.log("icons array " + k + " " + this.state.stateicons[k].ticker);
                        // console.log("port array " + j + " " + usethisport[j].coin);
                        if (usethisport[j].coin === this.state.stateicons[k].ticker) {
                            // console.log("matched");
                            this.state.stateicons[k].clicked = false;
                        }
                    }
                }
                // ghetto brute force way of adding api prices to icons
                for (k = 0; k < this.state.stateicons.length; k++) {
                    for (j = 0; j < apiprices.length; j++) {
                        // console.log("icons array " + k + " " + this.state.stateicons[k].ticker);
                        // console.log("api prices array " + j + " " + apiprices[j].coin);
                        if (apiprices[j].coin === this.state.stateicons[k].ticker) {
                            // console.log("matched");
                            this.state.stateicons[k].price = apiprices[j].price;
                            this.state.stateicons[k].percent_change_24 = apiprices[j].percent_change_24;
                            j = apiprices.length;
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
            .then(res => {
                this.getportfolio();
                this.coinadded();
            })
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

    calcTotal({ price, quantity }) {
        const one = price.slice(1).replace(/,/g,'')
        console.log("Price", one)
        console.log("Quantitiy", quantity)
        const oneParsed = parseFloat(one)
        const twoParsed = parseInt(quantity)
        console.log(oneParsed, twoParsed)
        return twoParsed * oneParsed
    }

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
                    {/* {this.state.portfolio.length ? (
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
                        )} */}



                    {this.state.portfolio.length ? (
                        <Table>
                            {this.state.portfolio.map(portfolio => {

                                // const numberWithCommas = (x) => {
                                //     var parts = x.toString().split(".");
                                //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                //     return parts.join(".");
                                //   }

                                return (
                                    <tr>
                                        <th scope="row"> <DeleteBtn onClick={() => this.deleteCoin(portfolio._id)} /></th>
                                        <td> <a id="coinAtag" href={"/coins/" + portfolio.coin}> {portfolio.coin}  </a> <span class="badge badge-dark badge-pill">{portfolio.coin}</span> </td>
                                        {portfolio.quantity > 0 ? (
                                            <td> {portfolio.quantity.toLocaleString()}</td>) : (
                                                <td>Watching</td>)
                                        }
                                        {portfolio.purchaseprice == null ? (
                                            <td>N/A</td>) : (
                                                <td> {portfolio.purchaseprice.toLocaleString({ style: 'currency', currency: 'USD' })}</td>)}
                                        <td> {portfolio.price}</td>
                                        <td> {portfolio.percent_change_24}%</td>
                                        {portfolio.quantity > 0 ? (
                                            <td> {this.calcTotal(portfolio).toLocaleString({ style: 'decimal' })}</td>) : (
                                                <td>Not a HODLER</td>
                                            )}
                                        <td> {portfolio.gain_loss}</td>
                                    </tr>
                                );
                            })}
                        </Table>
                    ) : (
                            <h3>No Results to Display. Add Coins. </h3>
                        )}
                </div>
            </div>
        );
    }

};

export default Portfolio;

