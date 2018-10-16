const mongoose = require("mongoose");
const db = require("../models");

// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://heroku_c5d2bt4t:TatersHER1@ds131963.mlab.com:31963/heroku_c5d2bt4t"
// );

// mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_c5d2bt4t:n1h4fm5u1bi95gjf33uiq0l88o@ds131963.mlab.com:31963/heroku_c5d2bt4t");
// this longer one is the good one


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