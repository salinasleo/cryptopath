const db = require("../models");

// Defining methods for the coinsController
module.exports = {
  findAll: function(req, res) {
    db.IconsModel
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.IconsModel
      .findAndModify({query: req.params.ticker, new:true, }, req.body)
      .then(dbModel => 
        {
            res.json(dbModel);
            return res.json(dbModel);
        }
        )
      .catch(err => res.status(422).json(err));
  }
};