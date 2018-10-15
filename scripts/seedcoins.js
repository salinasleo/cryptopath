const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/cryptopath"
);

const coinsSeed = [
  {
    username: "leosal",
    coin: "ETH",
    purchasedate: "10/01/2018",
    purchaseprice: 600.01,
    favorite: true,
    notes: "this is a good coin"
  },
  {
    username: "leosal",
    coin: "BTC",
    purchasedate: "06/01/2018",
    purchaseprice: 8210.51,
    favorite: true,
    notes: "this one is digital cash"
  },
  {
    username: "leosal",
    coin: "LTC",
    purchasedate: "04/01/2018",
    purchaseprice: 130.45,
    favorite: true,
    notes: "this coin will go to zero"
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