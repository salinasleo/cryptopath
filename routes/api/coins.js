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


module.exports = router;