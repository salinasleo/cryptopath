const mongoose = require("mongoose");
const db = require("../models");

// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://heroku_c5d2bt4t:TatersHER1@ds131963.mlab.com:31963/heroku_c5d2bt4t"
// );

// mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_c5d2bt4t:n1h4fm5u1bi95gjf33uiq0l88o@ds131963.mlab.com:31963/heroku_c5d2bt4t");


const iconsSeed = [
    {clicked: false,
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
  } ,

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
  },

  {
    clicked: false,
    url: "/doge",
    src: "./images/doge.ico",
    name: "doge",
    ticker: "DOGE",
    price: "$0.54",
    speed: "20s",
    styling: "App-logo-counter-fast"
  }
];

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