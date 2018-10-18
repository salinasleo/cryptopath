const mongoose = require("mongoose");
const db = require("../models");
var request = require("request");

var apiprices = [];
var pricepair = {};

// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://localhost/cryptopath"
// );

// mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_c5d2bt4t:n1h4fm5u1bi95gjf33uiq0l88o@ds131963.mlab.com:31963/heroku_c5d2bt4t");
// this longer one is the good one


const coinsSeed = [
  {
    username: "leosal",
    coin: "ETH",
    quantity: 6,
    purchasedate: "10/01/2018",
    purchaseprice: 600.01,
    favorite: true,
    notes: "this is a good coin",
    price: "",    
    value: "",
    gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "leosal",
    coin: "BTC",
    quantity: 1.4,
    purchasedate: "06/01/2018",
    purchaseprice: 8210.51,
    favorite: true,
    notes: "this one is digital cash",
    price: "", 
    value: "",
    gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "leosal",
    coin: "LTC",
    quantity: 8,
    purchasedate: "04/01/2018",
    purchaseprice: 130.45,
    favorite: true,
    notes: "this coin will go to zero",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "leosal",
    coin: "IOTA",
    quantity: 333,
    purchasedate: "04/25/2018",
    purchaseprice: 1.45,
    favorite: true,
    notes: "this coin will will help machines pay each other for services",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "leosal",
    coin: "XMR",
    quantity: 55,
    purchasedate: "06/15/2018",
    purchaseprice: 180.45,
    favorite: true,
    notes: "this coin is super private",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "leosal",
    coin: "XLM",
    quantity: 160,
    purchasedate: "06/15/2018",
    purchaseprice: 0.45,
    favorite: true,
    notes: "this coin is stellar",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo1",
    coin: "BTC",
    quantity: 5,
    purchasedate: "06/01/2018",
    purchaseprice: 8210.51,
    favorite: true,
    notes: "this one is digital cash",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo1",
    coin: "LTC",
    quantity: 42,
    purchasedate: "04/01/2018",
    purchaseprice: 130.45,
    favorite: true,
    notes: "this coin will go to zero",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo1",
    coin: "ETH",
    quantity: 12,
    purchasedate: "10/01/2018",
    purchaseprice: 600.01,
    favorite: true,
    notes: "this is a good coin",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },

  {
    username: "demo1",
    coin: "DASH",
    quantity: 22,
    purchasedate: "02/25/2018",
    purchaseprice: 200.34,
    favorite: true,
    notes: "this coin will will help machines pay each other for services",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo1",
    coin: "KIN",
    quantity: 4552,
    purchasedate: "07/15/2018",
    purchaseprice: 0.0006,
    favorite: true,
    notes: "this coin is super private",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo2",
    coin: "ETH",
    quantity: 16,
    purchasedate: "10/01/2018",
    purchaseprice: 600.01,
    favorite: true,
    notes: "this is a good coin",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo2",
    coin: "BTC",
    quantity: 2.55,
    purchasedate: "06/01/2018",
    purchaseprice: 8210.51,
    favorite: true,
    notes: "this one is digital cash",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo2",
    coin: "LTC",
    quantity: 6,
    purchasedate: "04/01/2018",
    purchaseprice: 130.45,
    favorite: true,
    notes: "this coin will go to zero",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
  {
    username: "demo2",
    coin: "IOTA",
    quantity: 200,
    purchasedate: "04/25/2018",
    purchaseprice: 1.45,
    favorite: true,
    notes: "this coin will will help machines pay each other for services",
    price: "",     value: "",     gain_loss: "",
    last_updated_price: "", 
    percent_change_24: "",
    volume24: ""
  },
];

console.log("what is passed to mongo in insertmany");
console.log(coinsSeed);



// function getPrices(coin) {
//   console.log("Getting prices from API...");

//   var omdb = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=?fsym=USDT,BTC,ETH,XRP,BCH,EOS,XLM,LTC,ADA,XMR,TRX,IOTA,DASH,BNB,NEO,ETC,XEM,XTZ,VET,DOGE,ZEC,MKR,BTG,OMG,ZRX,ONT,DCR,QTUM,LSK,KIN'&tsyms=USD&extraParams=cryptopath";

//   request(omdb, function(error, response, body) {

//     if (!error && response.statusCode === 200) {
//       var Prices= JSON.parse(body);
//       console.log(Prices);
//       console.log("Prices length is " + Object.keys(Prices.DISPLAY).length);
//       parsePrices(Prices);
//     }

//   });
// };

// function parsePrices(Prices) {
//   var i;
//   var coins= Object.keys(Prices.DISPLAY);
//   console.log(coins);
//   console.log("length is " + coins.length);

//   for (i = 0; i < coins.length; i++) { 

//   var path = "Prices.DISPLAY." + coins[i];

//   console.log(path);


//   // console.log("Price: " + Prices.DISPLAY.BTC.USD.PRICE + '\n' +
//   //           "Last Updated: " + Prices.DISPLAY.BTC.USD.LASTUPDATE + '\n'     ) ;

//   console.log("Price: " + eval(path + ".USD.PRICE") + '\n' +
//             "Last Updated: " + eval(path + ".USD.LASTUPDATE") + '\n' +
//             "Percent Change 24hrs: " + eval(path + ".USD.CHANGEPCT24HOUR") + "%" + '\n'   ) ;

// }
// };


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

  for (i = 0; i < coinsSeed.length; i++) {
    for (j = 0; j < apiprices.length; j++) {
      if (apiprices[j].coin === coinsSeed[i].coin) {
        coinsSeed[i].price = apiprices[j].price;
        coinsSeed[i].percent_change_24 = apiprices[j].percent_change_24;
        coinsSeed[i].last_updated_price=Date.now();
        j = apiprices.length;
      }
    }
  }
  console.log(coinsSeed);

  db.Coins
  .remove({})
  .then(() => db.Coins.collection.insertMany(coinsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
  // const merged = {...apiprices, ...coinsSeed};
  // console.log("merged objects");
  // console.log(merged);
  // console.log("updating prices after apiprices2000 ms");
  // console.log(apiprices);
  // db.Coins
  //   .find({})
  //   .then(() => db.Coins.collection.updateMany(

  //     {},
  //     { $set: { "last_updated_price": "now" } }
  //   ))
  //   .then(data => {
  //     console.log(data.result.n + " records inserted!");
  //     process.exit(0);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     process.exit(1);
  //   });
};

