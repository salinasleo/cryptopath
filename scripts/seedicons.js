const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/cryptopath"
);

// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

const iconsSeed = [
    {clicked: false,
    url: "/bitcoin",
    src: "./images/bitcoin.ico",
    name: "bitcoin",
    price: "$6,650",
    speed: "20s",
    styling: "App-logo"
  },

  {
    clicked: false,
    url: "/ethereum",
    src: "./images/ethereum.ico",
    name: "ethereum",
    price: "$224",
    speed: "20s",
    styling: "App-logo-counter-fast"
  },

  {
    clicked: false,
    url: "/litecoin",
    src: "./images/litecoin.ico",
    name: "litecoin",
    price: "$54",
    speed: "20s",
    styling: "App-logo-fast"
  } ,

  {
    clicked: false,
    url: "/monero",
    src: "./images/monero.ico",
    name: "monero",
    price: "$117",
    speed: "20s",
    styling: "App-logo-counter"
  },

  {
    clicked: false,
    url: "/lisk",
    src: "./images/lisk.ico",
    name: "lisk",
    price: "$4.10",
    speed: "20s",
    styling: "App-logo"
  },

  {
    clicked: false,
    url: "/kin",
    src: "./images/kin.ico",
    name: "kin",
    price: "$0.06",
    speed: "20s",
    styling: "App-logo-counter-fast"
  },

  {
    clicked: false,
    url: "/stellar",
    src: "./images/stellar.ico",
    name: "stellar",
    price: "$0.34",
    speed: "20s",
    styling: "App-logo-fast"
  },

  {
    clicked: false,
    url: "/dash",
    src: "./images/dash.ico",
    name: "dash",
    price: "$200",
    speed: "20s",
    styling: "App-logo-counter"
  },

  {
    clicked: false,
    url: "/iota",
    src: "./images/iota.ico",
    name: "iota",
    price: "$0.54",
    speed: "20s",
    styling: "App-logo"
  },

  {
    clicked: false,
    url: "/doge",
    src: "./images/doge.ico",
    name: "doge",
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