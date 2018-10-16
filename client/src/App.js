import React, { Component } from 'react';
import Icons from "./components/Icons";
import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';
import Coins from "./utils/Coins";


var request = require("request");
var apiprices = [];
var pricepair = {};


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
          // process.env.REACT_APP_SECRET_CODE = apiprices;
      }

  });
};

getPrices();

window.setTimeout(updatePricesfromAPI, 2000);

function updatePricesfromAPI(apiprices) {
  console.log("updating prices after 2000 ms");
  console.log(apiprices);
  console.log("process.env.REACT_APP_SECRET_CODE is " + process.env.REACT_APP_SECRET_CODE);
  
  /*
  Coins.updatePrices(apiprices)
  .then(res => {
    var updatedtable = res.data;
      })
  .catch(err => {
        alert("something went wrong with price update " + err);
    console.log(err);
})*/
} ;

class App extends Component {
  
  

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
