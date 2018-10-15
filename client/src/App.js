import React, { Component } from 'react';
import Icons from "./components/Icons";
import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';
var request = require("request");


function getPrices(coin) {
  console.log("Getting prices from API...");

  var omdb = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coin + "&tsyms=USD&e=Coinbase&extraParams=cryptopath";
  
  request(omdb, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      var Prices= JSON.parse(body);
      console.log(Prices);
      console.log("Prices length is " + Object.keys(Prices.DISPLAY).length);
      parsePrices(Prices);
    }

  });
};

function parsePrices(Prices) {
  var i;
  var coins= Object.keys(Prices.DISPLAY);
  console.log(coins);
  console.log("length is " + coins.length);

  for (i = 0; i < coins.length; i++) { 
  

  var path = "Prices.DISPLAY." + coins[i];

  console.log(path);

    
  // console.log("Price: " + Prices.DISPLAY.BTC.USD.PRICE + '\n' +
  //           "Last Updated: " + Prices.DISPLAY.BTC.USD.LASTUPDATE + '\n'     ) ;

  console.log("Price: " + eval(path + ".USD.PRICE") + '\n' +
            "Last Updated: " + eval(path + ".USD.LASTUPDATE") + '\n' +
            "Percent Change 24hrs: " + eval(path + ".USD.CHANGEPCT24HOUR") + "%" + '\n'   ) ;

}
};

getPrices("BTC,ETH");



class App extends Component {

  // state = {
  //   icons: [
  //     {
  //       clicked: false,
  //       url: "/bitcoin",
  //       src: "./images/bitcoin.ico",
  //       name: "bitcoin",
  //       price: "$6,650",
  //       speed: "20s",
  //       styling: "App-logo"
  //     },

  //     {
  //       clicked: false,
  //       url: "/ethereum",
  //       src: "./images/ethereum.ico",
  //       name: "ethereum",
  //       price: "$224",
  //       speed: "20s",
  //       styling: "App-logo-counter-fast"
  //     }
  //   ]
  // };

  renderIcons() {
    return this.state.icons.map((icon, index) => (
      <Icons {...icon} alt={icon.name} handleClick={this.handleClick} />
    ));
  }


  handleClick = event => {
    console.log(event.target);
    const { id } = event.target.dataset;
    let icons = [...this.state.icons];
    console.log(id);
    console.log(icons);
    
    // const icon = icons[id];
  };


  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          {this.renderIcons()}
        </header> */}
        <Dashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
