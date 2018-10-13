const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/cryptopath"
);

const usersSeed = [
  {
    username: "leosal",
    password: "culero",
    date: new Date(Date.now())
  },
  {
    username: "demo1",
    password: "culero1",
    date: new Date(Date.now())
  },
  {
    username: "demo2",
    password: "culero2",
    date: new Date(Date.now())
  },
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });