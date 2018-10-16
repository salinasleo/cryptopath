const router = require("express").Router();
const coinsController = require("../../controllers/coinsController");

// Matches with "/api/coins"
router.route("/")
  .get(coinsController.findAll)
  .post(coinsController.create);

// Matches with "/api/coins/:id"
router.route("/:id")
  .get(coinsController.findById)
  .put(coinsController.update)
  .delete(coinsController.remove);

  // Matches with "/api/coins/login/:username"
router.route("/login/:username")
  .get(coinsController.findByUser);

router.route("/priceupdate")
  .put(coinsController.addAPIdata);

// router.route("/coins/LTC")
//   .get(fridge.html);

//   router.route("/coins/LTC")
//   res.sendFile(fridge.html);

// router.route("/coins/LTC/", function(req, res) {
//     res.sendFile(fridge.html);
//   });

module.exports = router;