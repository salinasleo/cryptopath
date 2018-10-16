const db = require("../models");

// Defining methods for the coinsController
module.exports = {
  findAll: function(req, res) {
    db.Coins
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Coins
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    db.Coins
      .find({username:req.params.username})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Coins
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Coins
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addAPIdata: function(req, res) {
    db.Coins
      .findAndModify({coin: req.params.coin, new: true}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Coins
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


// price:  { type: Number },
// last_updated_price: { type: Date, default: Date.now }, 
// percent_change_24: { type: Number },
// volume24:

// db.people.findAndModify({
//   query: { name: "Andy" },
//   sort: { rating: 1 },
//   update: { $inc: { score: 1 } },
//   upsert: true
// })