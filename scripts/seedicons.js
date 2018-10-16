const mongoose = require("mongoose");
const db = require("../models");
var request = require("request");

var apiprices = [];
var pricepair = {};

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/cryptopath"
//   "mongodb://heroku_c5d2bt4t:TatersHER1@ds131963.mlab.com:31963/heroku_c5d2bt4t"
);

// mongoose.Promise = Promise;
// mongoose.connect("mongodb://heroku_c5d2bt4t:n1h4fm5u1bi95gjf33uiq0l88o@ds131963.mlab.com:31963/heroku_c5d2bt4t");
// this longer one is the good one

const iconsSeed = [
    {clicked: false,
    url: "/bitcoin",
    src: "./images/bitcoin.ico",
    name: "Bitcoin",
    ticker: "BTC",
    price: "$6,650",
    speed: "20s",
    styling: "App-logo"
  },

  {
    clicked: false,
    url: "/ethereum",
    src: "./images/ethereum.ico",
    name: "Ethereum",
    ticker: "ETH",
    price: "$224",
    speed: "20s",
    styling: "App-logo-counter-fast"
  },

  {
    clicked: false,
    url: "/litecoin",
    src: "./images/litecoin.ico",
    name: "Litecoin", 
    ticker: "LTC",
    price: "$54",
    speed: "20s",
    styling: "App-logo-fast"
  } ,

  {
    clicked: false,
    url: "/monero",
    src: "./images/monero.ico",
    name: "Monero",
    ticker: "XMR",
    price: "$117",
    speed: "20s",
    styling: "App-logo-counter"
  },

  {
    clicked: false,
    url: "/lisk",
    src: "./images/lisk.ico",
    name: "Lisk",
    ticker: "LSK",
    price: "$4.10",
    speed: "20s",
    styling: "App-logo"
  },

  {
    clicked: false,
    url: "/kin",
    src: "./images/kin.ico",
    name: "Kin",
    ticker: "KIN",
    price: "$0.06",
    speed: "20s",
    styling: "App-logo-counter-fast"
  },

  {
    clicked: false,
    url: "/stellar",
    src: "./images/stellar.ico",
    name: "Stellar",
    ticker: "XLM",
    price: "$0.34",
    speed: "20s",
    styling: "App-logo-fast"
  },

  {
    clicked: false,
    url: "/dash",
    src: "./images/dash.ico",
    name: "Dash",
    ticker: "DASH",
    price: "$200",
    speed: "20s",
    styling: "App-logo-counter"
  },

  {
    clicked: false,
    url: "/iota",
    src: "./images/iota.ico",
    name: "Iota",
    ticker: "IOTA",
    price: "$0.54",
    speed: "20s",
    styling: "App-logo"
  },

  {
    clicked: false,
    url: "/doge",
    src: "./images/doge.ico",
    name: "Doge",
    ticker: "DOGE",
    price: "$0.54",
    speed: "20s",
    styling: "App-logo-counter-fast"
  }
];



function getPrices() {
    console.log("Getting prices from API...");
    var omdb = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=?fsym=USDT,BTC,ETH,XRP,BCH,EOS,XLM,LTC,ADA,XMR,TRX,IOTA,DASH,BNB,NEO,ETC,XEM,XTZ,VET,DOGE,ZEC,MKR,BTG,OMG,ZRX,ONT,DCR,QTUM,LSK,KIN,XLR,KIN'&tsyms=USD&extraParams=cryptopath";
  
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
  
  console.log("testing");
  
  
  setTimeout(updatePricesfromAPI, 3000);
  
  
  function updatePricesfromAPI() {
  
    for (i = 0; i < iconsSeed.length; i++) {
      for (j = 0; j < apiprices.length; j++) {
        if (apiprices[j].coin === iconsSeed[i].ticker) {
            iconsSeed[i].price = apiprices[j].price;
            iconsSeed[i].percent_change_24 = apiprices[j].percent_change_24;
            iconsSeed[i].last_updated_price=Date.now();
            if (apiprices[j].percent_change_24>2)  
            {
                iconsSeed[i].styling= "App-logo-fast"
            }
            else if (apiprices[j].percent_change_24>0)  
            {
                iconsSeed[i].styling=  "App-logo" 
            }
            else if (apiprices[j].percent_change_24>-2)  
            {
                iconsSeed[i].styling=  "App-logo-counter" 
            }
            else
            {
                iconsSeed[i].styling=  "App-logo-counter-fast";
            }
          j = apiprices.length;
        }
      }
    }
    console.log(iconsSeed);
  

db.IconsModel
  .remove({})
  .then(() => db.IconsModel.collection.insertMany(iconsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
  };