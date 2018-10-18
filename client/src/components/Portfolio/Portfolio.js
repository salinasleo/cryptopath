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



class Portfolio extends Component {
    state = {
        counter: 0,
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
        this.getPrices();
        this.getportfolio();
        this.geticons();
        
        // this.portfoliorender();
        // // setInterval(this.forceUpdate(), 1000);
        // this.forceUpdate();
        // this.coinadded();
        this.timerID = setInterval(
            () => this.updatePostAPI(),
            2200
          );
        }
       
        updatePostAPI() {
            // this.getportfolio();
            // this.geticons();
            // this.portfoliorender();
            console.log("after seconds: " + this.timerID);
            console.log(this.state.stateicons);
            this.forceUpdate();
            this.getportfolio();
            if (this.state.stateicons["0"].price !== "$ 6,650") /*this is hardcoded price before appending prices*/
            {
                this.forceUpdate();
                clearInterval(this.timerID);
            };
          }


    getPrices() {
        console.log("Getting prices from API...");
        var omdb = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=?fsym=USDT,USDT,BTC,ETH,XRP,BCH,EOS,XLM,LTC,ADA,XMR,TRX,IOTA,DASH,BNB,NEO,ETC,XEM,XTZ,VET,DOGE,ZEC,MKR,BTG,OMG,ZRX,ONT,DCR,QTUM,LSK,KIN,USDT'&tsyms=USD&extraParams=cryptopath";

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
        console.log("rendering just icons i have");
    }


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
                // this.coinadded();
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
        console.log("getting portfolio right here right now");
        Coins.getportfolio(this.state.username)
            .then(res => {
                this.setState({ portfolio: res.data })
                console.log(this.state.portfolio);
                console.log("data above came from server");
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
                let appendedIcons = this.state.stateicons;
                for (k = 0; k < appendedIcons.length; k++) {
                    for (j = 0; j < apiprices.length; j++) {
                        // console.log("icons array " + k + " " + this.state.stateicons[k].ticker);
                        // console.log("api prices array " + j + " " + apiprices[j].coin);
                        if (apiprices[j].coin === appendedIcons[k].ticker) {
                            // console.log("matched");
                            appendedIcons[k].price = apiprices[j].price;
                            appendedIcons[k].percent_change_24 = apiprices[j].percent_change_24;
                            j = apiprices.length;
                        }
                    }
                    if (k===appendedIcons.length) {
                        this.setState({stateicons: appendedIcons});
                        console.log("appended icons are " + this.state.stateicons);
                    }
                }

                let appendedPortfolio = this.state.portfolio;
                console.log("pre appended porfolio is " + appendedPortfolio);
                                // do the same but to portfolio
                for (k = 0; k < appendedPortfolio.length; k++) {
                    for (j = 0; j < apiprices.length; j++) {
                        // console.log("icons array " + k + " " + this.state.stateicons[k].ticker);
                        // console.log("api prices array " + j + " " + apiprices[j].coin);
                        if (apiprices[j].coin === appendedPortfolio[k].coin) {
                            // console.log("matched");
                            appendedPortfolio[k].price = apiprices[j].price;
                            appendedPortfolio[k].percent_change_24 = apiprices[j].percent_change_24;
                            appendedPortfolio[k].value = parseFloat(apiprices[j].price.slice(1).replace(/,/g,''))*parseFloat(appendedPortfolio[k].quantity) ;
                            if  (isNaN(appendedPortfolio[k].value)) { appendedPortfolio[k].value = "Not a HODLER"};
                            appendedPortfolio[k].gain_loss = appendedPortfolio[k].value - (parseFloat(appendedPortfolio[k].quantity)*parseFloat(appendedPortfolio[k].purchaseprice));
                            if  (isNaN(appendedPortfolio[k].gain_loss)) { appendedPortfolio[k].gain_loss = "Not a HODLER"};
                            j = apiprices.length;
                        }
                    }
                    console.log("length is " + appendedPortfolio.length + "and iteration is " + k)
                    if (k===appendedPortfolio.length-1) {
                        this.setState({porfolio: appendedPortfolio});
                        console.log("appended porfolio is " + this.state.portfolio.JSON);
                        console.log("appended porfolio is " + appendedPortfolio.JSON.stringify);
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
        this.forceUpdate();
        this.setState ({counter:1});
        /*the prices are now being show otherwise*/
    };

    // coinadded = () => {
    //     console.log("Thank you for adding new coin");
    //     this.getportfolio();
    // };


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
                // this.forceUpdate();
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
        var one
        if (this.state.stateicons["0"].price !== "$ 6,650") {
            one = price.slice(1).replace(/,/g,'')
        }
        else {
            one=price;
        }
        console.log("Price", one)
        console.log("Quantitiy", quantity)
        const oneParsed = parseFloat(one)
        const twoParsed = parseFloat(quantity)
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

                                           {/* <td> $ {portfolio.value.toLocaleString({ style: 'decimal' })}</td>  */}
                                            {/* <td> $ {portfolio.gain_loss.toLocaleString({ style: 'decimal' })}</td>   */}

                                   

                                        {portfolio.value === "Not a HODLER" ? (
                                            <td> {portfolio.value}</td> ) : 
                                            portfolio.value == null ? (
                                             <td>Waiting on Prices</td>
                                            ) : ( <td> $ {portfolio.value.toLocaleString({ style: 'currency', currency: 'USD'})}</td> )
                                        }

                                         {portfolio.gain_loss === "Not a HODLER" ? (
                                            <td> {portfolio.gain_loss}</td> ) : 
                                            portfolio.gain_loss == null ? (
                                             <td>Waiting on Prices</td>
                                            ) : ( <td> $ {portfolio.gain_loss.toLocaleString({ style: 'currency', currency: 'USD' })}</td> )
                                        }

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

