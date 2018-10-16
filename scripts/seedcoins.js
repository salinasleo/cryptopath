const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/cryptopath"
);

// mongoose.Promise = Promise;
// mongoose.connect("mongodb://heroku_c5d2bt4t:n1h4fm5u1bi95gjf33uiq0l88o@ds131963.mlab.com:31963/heroku_c5d2bt4t");


const coinsSeed = [
  {
    username: "leosal",
    coin: "ETH",
    quantity: 6,
    purchasedate: "10/01/2018",
    purchaseprice: 600.01,
    favorite: true,
    notes: "this is a good coin"
  },
  {
    username: "leosal",
    coin: "BTC",
    quantity: 1.4,
    purchasedate: "06/01/2018",
    purchaseprice: 8210.51,
    favorite: true,
    notes: "this one is digital cash"
  },
  {
    username: "leosal",
    coin: "LTC",
    quantity: 8,
    purchasedate: "04/01/2018",
    purchaseprice: 130.45,
    favorite: true,
    notes: "this coin will go to zero"
  },
  {
    username: "leosal",
    coin: "IOTA",
    quantity: 333,
    purchasedate: "04/25/2018",
    purchaseprice: 1.45,
    favorite: true,
    notes: "this coin will will help machines pay each other for services"
  },
  {
    username: "leosal",
    coin: "XMR",
    quantity: 55,
    purchasedate: "06/15/2018",
    purchaseprice: 180.45,
    favorite: true,
    notes: "this coin is super private"
  },
  {
    username: "leosal",
    coin: "XLR",
    quantity: 160,
    purchasedate: "06/15/2018",
    purchaseprice: 0.45,
    favorite: true,
    notes: "this coin is stellar"
  },
  {
    username: "demo1",
    coin: "BTC",
    quantity: 5,
    purchasedate: "06/01/2018",
    purchaseprice: 8210.51,
    favorite: true,
    notes: "this one is digital cash"
  },
  {
    username: "demo1",
    coin: "LTC",
    quantity: 42,
    purchasedate: "04/01/2018",
    purchaseprice: 130.45,
    favorite: true,
    notes: "this coin will go to zero"
  },
  {
    username: "demo1",
    coin: "ETH",
    quantity: 12,
    purchasedate: "10/01/2018",
    purchaseprice: 600.01,
    favorite: true,
    notes: "this is a good coin"
  },

  {
    username: "demo1",
    coin: "DASH",
    quantity: 22,
    purchasedate: "02/25/2018",
    purchaseprice: 200.34,
    favorite: true,
    notes: "this coin will will help machines pay each other for services"
  },
  {
    username: "demo1",
    coin: "KIN",
    quantity: 4552,
    purchasedate: "07/15/2018",
    purchaseprice: 0.0006,
    favorite: true,
    notes: "this coin is super private"
  },
  {
    username: "demo2",
    coin: "ETH",
    quantity: 16,
    purchasedate: "10/01/2018",
    purchaseprice: 600.01,
    favorite: true,
    notes: "this is a good coin"
  },
  {
    username: "demo2",
    coin: "BTC",
    quantity: 2.55,
    purchasedate: "06/01/2018",
    purchaseprice: 8210.51,
    favorite: true,
    notes: "this one is digital cash"
  },
  {
    username: "demo2",
    coin: "LTC",
    quantity: 6,
    purchasedate: "04/01/2018",
    purchaseprice: 130.45,
    favorite: true,
    notes: "this coin will go to zero"
  },
  {
    username: "demo2",
    coin: "IOTA",
    quantity: 200,
    purchasedate: "04/25/2018",
    purchaseprice: 1.45,
    favorite: true,
    notes: "this coin will will help machines pay each other for services"
  },
];

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